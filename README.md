This is example of website with rendering conditioned on "cf-device-type" header.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
curl "http://localhost:3000/" # will fallback to mobile template as header "cf-device-type" and url parameters are not present
curl "http://localhost:3000/?mobile" # mobile template
curl "http://localhost:3000/?desktop" # desktop template
curl "http://localhost:3000/?desktop&mobile" # mobile template as it has higher priority

curl -H "cf-device-type:mobile"  "http://localhost:3000/" # mobile template
curl -H "cf-device-type:desktop"  "http://localhost:3000/" # desktop template
curl -H "cf-device-type:tablet"  "http://localhost:3000/" # desktop template in any other case

curl -H "cf-device-type:mobile"  "http://localhost:3000/?desktop" # desktop template as url parameter has higher priority
```
