FROM mongo

ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

WORKDIR /mongo-import
ADD . .
RUN sed -i -e 's/\r$//' mongo_import.sh
ENTRYPOINT ["/wait-for-it.sh", "mongodb:27017", "-t", "30", "--", "./mongo_import.sh"]
