# poc-exo-training

## Installation 

1. Install using pip :
 > pip install rst2html5slides 
 
then you can execute the script directly : rst2html5slides

2. Install from sources

a. Download sources from https://bitbucket.org/andre_felipe_dias/rst2html5slides/downloads/ into RST2HTML5SLIDES_HOME

b. Open the folder RST2HTML5SLIDES_HOME/rst2html5slides and run rst2html5slides using :
> python rst2html5slides.py

3. use the simple file simple-exo.rst that you can find in the folder sample, execute the following command :
> rst2html5slides --template PATH_TEMPLATE/exo-template.html exo-sample.rst exo-sample.html

or

> python RST2HTML5SLIDES_HOME/rst2html5slides.py --template PATH_TEMPLATE/exo-template.html exo-sample.rst exo-sample.html

## Docker

A Dockerfie is available. First build the image with:

> docker build . -t poc-exo-training

then run the slides generation with

> docker run --rm -v ${PWD}:/training --name training poc-exo-training

The slides are available in slides/exo-sample.html


## Build your own slides

We are using reStructredText for the content syntax, check more about the syntax in  http://docutils.sourceforge.net/rst.html

Create a text file, and insert the content of the slides using the following rules :

* A new slide is created whenever you add a section syntax 
  * Slide with a title, insert section Title syntax, the inserted title will be the slide's title  http://docutils.sourceforge.net/docs/user/rst/quickref.html#section-structure 
  * Slide without a title, use a subtitle with no text ( ---- )
* To use the right design of the slides , we need to add a CSS class to the section with the tag **:class:** .
 We have 3 styles ready to use which are :
  * Opening slide : for the first slide of the presentation, we add the syntax **:class: opening-slide** before the new slide syntax
  * Chapter slide : for new chapters in the presentation, we add the syntax **:class: chapter-slide** before the new slide syntax
  * Raw content slide : for all content slides, we add the syntax **:class: slide** before the new slide-syntax
  * If we want to use a new slide without a title, we need to use **:class: no-title-slide** 
  
You can check [the sample slides file](sample/exo-sample.rst) for more details
