[![codecov](https://codecov.io/gh/bjerkio/tripletexjs/branch/next/graph/badge.svg?token=4XcZJw9JXC)](https://codecov.io/gh/bjerkio/tripletexjs)

![](https://raw.githubusercontent.com/Bjerkio/tripletexjs.github.io/master/header.jpg)

## Tripletex 2.0 Node.js / Javascript / Typescript API Wrapper

A wrapper for Tripletex 2.0 API in Typescript / Javascript.

The `v3` (next) version is reworked from the ground up, to become a fully
tailored client. This client has been used in production by many of
[Bjerk](https://github.com/bjerkio)s customers and other software vendors and
consultants for around six years.

For most of these years, we built the client with Swagger Codegen. Code
generation based on the OpenAPI / Swagger file had apparent benefits of being
kept updated with the Tripletex API. However, it had a lot to be desired in the
usability department.

After working on integrations with Folio, a Norwegian neo-bank, we realized it
was time for the client to get an overhaul. We wanted runtime type safety and a
hand-tailored developer experience.

Tripletexjs@next features types defined with [runtypes] and [typical-fetch].
Runtypes gives us type-safety in runtime, while typical-fetch gives us a nice
way to interface with Tripletex methods while having type-safety.

[runtypes]: https://github.com/pelotom/runtypes
[typical-fetch]: https://github.com/runeh/typical-fetch

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

Install it via:

```shell
yarn add tripletexjs
```

## Contributing

Send bug reports, feature requests, and code contributions to this repository.

Contributions to this library is much appreciated. Please have a look at project
tab or issues for more information on current help-needed.

## Disclaimer

This project is not associated with Tripletex AS at all. The maintainer works
with their platform and have done so for many years. The Tripletex logo belongs
to Tripletex AS. We put it there only so people would know we are speaking of
the Tripletex accounting software, owned and provided by the Norwegian
registered company Tripletex AS.
