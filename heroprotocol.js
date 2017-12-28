#!/usr/bin/js
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const { exec } = require('child_process');

const args = process.argv;
const destination = args[2];

if (!destination) {
    throw new Error('Please specify an input file or folder.');
}

const targetPath = path.resolve(__dirname, destination);

const PromiseUtils = {
    promisify: (fn) => {
        return (...args) => new Promise((resolve, reject) => {
            try {
                fn(...args, (err, ...results) => {
                    if (err) {
                        return reject(err);
                    }
    
                    resolve(...results);
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    promisifyAll: (obj, suffix = 'Async') => Object.keys(obj).reduce((acc, key) => {
        const fn = obj[key];
        let augments = { [key]: fn };
    
        if (typeof fn === 'function') {
            augments[key + suffix] = PromiseUtils.promisify(fn)
        }
    
        return Object.assign({}, acc, augments);
    }, obj),
    all: promises => new Promise((resolve, reject) => {
        let counter = 0;
        let results = new Array(promises.length).fill(undefined);
        let isPending = true;
        promises.forEach((promise, idx) => {
            if (!isPending) {
                return;
            }

            promise
                .then((...results) => {
                    results[idx] = results;
                    counter++;
                    if (counter == results.length) {
                        resolve(results);
                    }
                })
                .catch(err => {
                    isPending = false;
                    reject(err);
                });
        });
    }),
    map: (items, fn) => PromiseUtils.all(items.map(item => fn(item)))
};

const pfs = PromiseUtils.promisifyAll(fs);
const pexec = PromiseUtils.promisify(exec);

async function findReplays(targetPath) {
    const stat = await pfs.statAsync(targetPath);
    const isFile = await stat.isFile();

    if (isFile) {
        return [ targetPath ];
    }

    const filenames = await pfs.readdirAsync(targetPath);
    return filenames
        .filter(filename => /\.StormReplay$/.test(filename))
        .map(filename => path.resolve(targetPath, filename));
}

async function parseReplay(fullPath) {
    const { stdout, stderr } = await pexec(`docker run --name heroprotocol --rm -i -w /data/input -v="${fullPath}:/data/input/replay.StormReplay" ygunayer/heroprotocol:latest python /data/heroprotocol/heroprotocol.py --json --details replay.StormReplay`);
    return { stdout, stderr }
}

findReplays(targetPath)
    .then(replays => Promise.all(replays.map(parseReplay)))
    .then(data => console.log('ASDA', data))
    .catch(console.error.bind(console));
