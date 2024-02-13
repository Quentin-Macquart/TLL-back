<style>
body { font-size: 16px; margin: 1.5cm }
</style>

<a id="overview"></a>

- References branche is `dev` for development part
- Follow the [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), use `origin/main` branch for production.

## 1.Project

### 1.1 Description[> read](?#101-description)

### 1.2 How to configure [> read](?#102-configure)

### 1.3 Launch [> read](?#103-launch)

### 1.4 Architecture [> read](?#104-architecture)

### 1.5 Packaging and Deployment

##### a) Packaging [> read](?#105-packaging)

##### b) Deployment [> read](?#106-deploy)

---

<a id="101-description"></a>

## 1.1 Description of

_description_

<a id="102-configure"></a>

## 1.1 Description of

_configuration_

---

## 1.2 Launch the project

Make sure that you are running the application in the right environment
The available environments are `dev`, `int`,

```bash
$ dev: Developpement environment
$ int: Intergation environment
```

Make sure to respect those versionning to run the app correctly :

```bash
$ node --version
v18.12.1
$ npm --version
9.8.1
$ git --version
git version 2.39.2
```

- `npm install`: install dependencies

---

<a id="103-launch"></a>

## 1.3 Launch the project

- If you want to run the project, run : `npm run start`
- For testing and build just run : `npm run build`
- Test the App : `npm run test`
- Check the testing coverage of the App: `npm run coverage`

---

<a id="104-architecture"></a>

## 1.4 Architecture

_architecture_

---

<a id="105-packaging"></a>

## 1.5 Packaging and Deployment

#### a) Bumping version

The first step for the deployment is the packaging, for that, the application version needs to be updated.
This application supports all semantics words so <`major`. `minor`. `path`> (ex, v12.19.1)
To bump directly the `version` key in the package.json file, run this command : `npm run bump-version $semantic`.

For example if you wanna bump the version of this application with one minor update, use : `npm run bump-version minor`.
You can also add directly the version in number (ex, 3.22.4) in parameter instead of the semantic word.

This update has to be made on` dev` and will directly add & commit your changes on the ccurrent branch. Don't forget to push to the remote repository to update the package.

#### b) Packaging

If you wanna deploy this project you have to create a packaging, everything has been partially automatised.

## _packaging and deployment_

<a id="106-deploy"></a>

#### b) Deployment

_packaging and deployment_

[> top](?#overview)
