FROM mariadb

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

WORKDIR /mysql-import
ADD . .
RUN sed -i -e 's/\r$//' mysql_import.sh
ENTRYPOINT ["/wait-for-it.sh", "mariadb:3306", "-t", "30", "--", "./mysql_import.sh"]

