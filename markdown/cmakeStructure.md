# CMake - Regain a bit of structure in your life

## Intro
CMake is used in many places when building cross platform C++ projects. For me now, it is the defacto "goto" language to describe my build system. This isn't to say it doesn't have pitfalls, especially when information online is outdated and not agreed upon in the community. But I believe there are better ways to achieve cleaner cmake files. 

Normally I would say, your first port of call is the man pages/README/project tutorial hosted on the web. CMake is an exception to this rule as a lot of information found in the [CMake tutorial][] is outdated. It will still work in most instances, but much like "modern c++", there is a concept of "modern CMake", which will help you in the long run.  When searching for information for a solution, I often append the word "modern" to search term, while also limiting the search results to the past few years. 
(If you are looking for a intro to CMake please watch this [video][CMake intro video].)

## Structure
One very important factor to any project is structure. Obviously there are many arguments around project structure (where do includes go? single folder for all source?), but lets not get into these ones. CMake also benefits from having some structure to the CMake files. This is because many methods will allow sub-cmake files to inherit from their definitions, which can cause a lot of unknown and unwanted behaviour if unaware of this. 

#### Structure done right
One great example of this is the addition of definitions to compiler flags. Let's use the following example.
```
...
	add_definitions(-DPRINT_SECURE_INFOMATION)
	add_executable(my_test_app source.cpp)

	add_subdirectory(my_lib)
	target_link_libraries(my_test_app my_lib)
...
```
Here we can see that `PRINT_SECURE_INFOMATION` is defined for `my_test_app` , this may print some key information in your test app that should never be released to the public. We also add a sub-directory that we can expect to compile `my_lib`, we then link against this in `my_test_app`. A lot of people would not expect `PRINT_SECURE_INFOMATION` to be defined in the compilation of `my_lib`, but this is not true. As `add_subdirectory` is called after `add_definitions(-DPRINT_SECURE_INFOMATION)` it will be inherited by any compilation defined in `my_lib` directory. This could have huge consequences for a release version of `my_lib`, causing issues you could only imagine. But the key here is how to get round this. There are actually two ways of mitigating this issue and the first is the structure. 

If we employed a better structure, we would never had this issue.  The ideal folder structure is as below

##### Folder structure
```
source/
	CMakeLists.txt
	my_test_app/
		CMakeLists.txt
		source.cpp
		source.hpp
	my_lib/
		CMakelists.txt
		source.cpp
		source.hpp
```
##### source/CMakelists.txt 
```
...
	add_subdirectory(my_test_app)
	add_subdirectory(my_lib)
...
```
##### source/my_test_app/CMakelists.txt
```
...
	add_definitions(-DPRINT_SECURE_INFOMATION)
	add_executable(my_test_app source.cpp)

	target_link_libraries(my_test_app my_lib)
...
```
Now we can see that the definition can be placed in the cmake file only handling the compilation of `my_test_app`. This is great as we do not get leaking definitions.

This is not only true for definitions, it's true of `include_directories`, which can also cause [hard to diagnose issues][Stackoverflow include], and also in lots of other places, but there are other ways to get round this.

#### Target who?
Some of us do not have the luxury of defining our folder structure. If we are retro fitting CMake to an existing project, or maybe the team is insistent on using a difference structure (for a valid reason), we have another option. `target*`methods.

In addition to `target_link_libraries`, the concept of more `target*` methods came about in CMake 2.8.12, and this is when the true **modern** CMake started. This is a way of specifying which target you want the given operation to be applied to. Therefore we can always ensure that the operations will not be leaked to other directories or targets. Here's a list of the methods.
```
target_compile_options
target_compile_definitions
target_include_directories
target_sources  
```
We can probably guess what most of these do, but just look them up in the [documentation][CMake Documentation] if you are unsure. 

Not that it's a good idea, but theoretically you can have all your libraries and executable additions in one CMake file and there will be no leakage issues. THis is great for when you can not guarantee structure. This also helps with portability when needing to move folders with accompanying CMake files.

## Structure Round Up
Applying the fixes explained above are both important ways to help other users read and maintain CMake in your project. Although the structure of the project and CMake files have become less important in recent years due to `target*` usage, it does allow the user to follow the flow of the project and build up a mental model to work from. 

I recommend you immediately start using `target*` methods in current and future projects. The benefits are not only found in structuring, but also scoping, which will be discussed in future post. There is no reason to see `include_directories` any more, however you could have some arguments for using `add_definitions` for wide casting architecture needs.  

[CMake Documentation]: https://cmake.org/cmake/help/v3.10/index.html
[Stackoverflow include]: https://stackoverflow.com/questions/19981534/cmake-include-directories

[CMake tutorial]: https://cmake.org/cmake-tutorial/
[CMake intro video]: https://www.youtube.com/watch?v=JsjI5xr1jxM
