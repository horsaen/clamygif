# clamygif

<img src="https://cdn.discordapp.com/attachments/855436656697409586/1183020989857144973/Screenshot_2023-12-09_at_6.22.40_AM.png" />

## Requirements

- Working mongodb instance
- (p)npm
- nodejs

## Installation

```bash
git clone https://github.com/horsaen/clamygif.git
cd clamygif && pnpm install
```

## Customization

All variables can be found in the .env.local file, here's an example:

```
MONGODB_URI = mongodb://localhost:27017/clamygif
NEXTAUTH_SECRET=my_ultra_secure_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Usage

Make sure to set the vars in .env.local for a production environment !!

```bash
pnpm build && pnpm start
```

## Developing

```bash
pnpm dev
```

## Issues & bugs

If you find any issues or bugs, please report them on the issues page

The same applies for feature requests etc, prs are always welcome :D

## License

I don't really care, if you deploy it somewhere, please give me credit or just make it look different

<img src="https://cdn.discordapp.com/attachments/855436656697409586/1183021189208227861/Screenshot_20231209_062339_Discord.jpg" />