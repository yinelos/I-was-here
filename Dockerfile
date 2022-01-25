FROM python:3.8.1-slim-buster

# set environment variabless
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY . /src
WORKDIR /src

RUN pip install -r requirements.txt
RUN pip install pymongo


EXPOSE 5000

CMD ["gunicorn" , "-b", "0.0.0.0:5000", "src.app:app"]
