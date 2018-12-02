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