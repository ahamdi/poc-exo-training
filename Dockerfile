FROM python:3

RUN pip install rst2html5slides

RUN mkdir /training

ENTRYPOINT ["rst2html5slides"]
CMD ["--template", "/training/template/exo-template.html", "/training/sample/exo-sample.rst", "/training/slides"]
