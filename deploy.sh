#!/usr/bin/env bash

shopt -s globstar

PARALLEL_PROCESSES_COUNT=16

for i in build/**/*; do
    if [[ ! -f "$i" ]]
    then
        continue
    fi
    if test "$(jobs | wc -l)" -ge "$PARALLEL_PROCESSES_COUNT"; then
        wait -n
    fi

    {
        file=${i#"build/"}
        mimetype="$(xdg-mime query filetype "$i")"
        echo "$file $mimetype"

        curl -s \
            --request PUT \
            --user "${AWS_KEY_ID}:${AWS_SECRET_KEY}" \
            --aws-sigv4 "aws:amz:ru-central1:s3" \
            --upload-file "${i}" \
            -H "Content-Type: $mimetype" \
            "https://storage.yandexcloud.net/${BUCKET_NAME}/${file}"
    } &
done

wait
