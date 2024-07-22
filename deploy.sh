#!/usr/bin/env bash

shopt -s globstar


for i in build/**/*; do
    if [[ ! -f "$i" ]]
    then
        continue
    fi

    file=${i#"build/"}
    echo "$file"
    curl \
        --request PUT \
        --user "${AWS_KEY_ID}:${AWS_SECRET_KEY}" \
        --aws-sigv4 "aws:amz:ru-central1:s3" \
        --upload-file "${i}" \
        "https://storage.yandexcloud.net/${BUCKET_NAME}/${file}"
done
