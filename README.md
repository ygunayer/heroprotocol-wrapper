# heroprotocol-wrapper
This repo contains a wrapper script that allows you to use [docker-heroprotocol](https://github.com/ygunayer/docker-heroprotocol) as a standalone parser tool.

## Requirements
- Docker

## Installation
Simply put the scripts under a folder of your desire and add it to your `PATH` variable.

On Windows, you can do this by going into the system properties and adding it manually. The next time you open up `cmd` (having closed all previous instances) you'll be able to use the `heroprotocol` command.

On Linux and macOS, add the following line to your favorite terminal configuration file (`~/.bash_profile`, `~/.zshrc`, etc.) and restart your terminal sessions. You can also use the `source` command to update your `PATH` immediately (e.g. `source ~/.zshrc`)

```bash
PATH=$PATH:/path/to/heroprotocol-wrapper
```

## Running
The tool runs exactly the same as heroprotocol itself, so refer to the [How to Use](https://github.com/Blizzard/heroprotocol/#how-to-use) section on its documentation.

For simplicity's sake, here's an example:

```bat
> cd C:\Users\...\Documents\Heroes of the Storm\Accounts\...\...\Replays\Multiplayer
> heroprotocol --details "Battlefield of Eternity (10).StormReplay"

{'m_cacheHandles': ['s2ma\x00\x00EU\x1f\x1b"\x8d\xdb\x1fr \\\xbf\xd4D\x05R\x87\x10\x0b\x0f9\x95\x9b\xe8\x16T\x81b\xe4\x08\x1e\xa8U\x11',
...
```

## License
MIT
