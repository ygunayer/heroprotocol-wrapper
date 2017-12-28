#!/bin/ash
TARGET="$1"
if [[ -d "$TARGET" ]]; then
    echo '['
    for file in "$TARGET"/*.StormReplay
    do
        python /data/heroprotocol/heroprotocol.py --details --json "$file"
        echo ','
    done
    echo ']'
elif [[ -f "$TARGET" ]]; then
    python /data/heroprotocol/heroprotocol.py --details --json "$TARGET"
else
    echo "Not found: $TARGET"
    exit 1
fi