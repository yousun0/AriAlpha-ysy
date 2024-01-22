# Dockerfile
FROM python:3.12

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev && \
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN bash -c "source ~/.bashrc"
RUN apt-get install -y unixodbc-dev

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements requirements
RUN pip install --upgrade pip
RUN pip install -r requirements/requirements_production.txt
COPY . .


ENV PYTHONPATH /app
# Set Django settings module environment variable
ENV DJANGO_SETTINGS_MODULE=config.settings.production
# Here, add the collectstatic command
#RUN python manage.py collectstatic --noinput

#CMD ["bash"]