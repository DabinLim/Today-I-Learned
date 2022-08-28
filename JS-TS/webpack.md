

### 자주 사용하는 플러그인
1. BannerPlugin
   - 빌드 정보에 사용됨
    ```javascript
    new webpack.BannerPlugin({banner: ''})
    childProcess.execSync('git rev-parse --short HEAD')
    childProcess.execSync('git config user.name')```
2. DefinePlugin
   - 환경 의존적인 정보를 사용하기 위해서 사용됨 (root url)
   ```javascript
   new webpack.DefinePlugin({
       SOME_STRING: JSON.stringify('some string')
       'api.domain': 'http://dev.api.domain.com'
   })
   console.log(SOME_STRING)
   console.log(process.env.NODE_ENV)
   ```
3. HtmlTemplatePlugin
  - html을 처리하는데 사용되며 서드파티 플러그인
    ```javascript
    new HtmlWebpackPlugin({
        template: './src/index.html',
        templateParameters: {
            env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
        },
        minify: process.env.NODE_ENV === 'production' ? {
            collapseWhitespace: true,
            removeComments: true,
        } : false,
    }),
    ```
4. CleanWebpackPlugin
   - 빌드시 기존의 파일을 지우고 새로 빌드하게 해주는 플러그인

5. MiniCssExtractPlugin
    - 스타일 시트가 점점 많아지면 하나의 자바스크립트 결과물로 만드는 것이 부담
    스타일 시트 코드만 뽑아서 별도의 css 파일로 만들어 파일을 분리하는 것이 좋다
    여러 개의 작은 파일을 동시에 다운로드 하는 것보다 빠름
    ```javascript
    ...(process.env.NODE_ENV === 'production' ? 
    [new MiniCssExtractPlugin({filename: '[name].css'})] : [])
    ```

### 로더(loader)
1. css loader, sass loader, style loader
   - import로 불러온 css와 sass 파일을 하나의 css 파일로 묶어서 빌드해준다
   - style loader는 css파일은 `<style></style>` 태그 안에 넣어 cssom 트리를 만들 수 있도록 해준다.
```javascript
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
```

2. file loader, url loader
    - file loader : 빌드시 파일을 복사하여 빌드파일 생성
    - url loader : limit 이내의 크기의 파일은 빌드파일을 생성하지 않고 base64 형식으로 번들안에 직접 넣어준다.
    - webpack5 부터는 file-loader,url-loader를 기본적으로 제공, asset/resource 타입을 지정해 사용한다.
    - 자세한 설정은 webpack docs
```javascript
      {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
              publicPath: './dist/',
              name: '[name],[ext]?[hash]',
          },
      },
      {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
              publicPath: './dist/',
              name: '[name],[ext]?[hash]',
              limit: 2000,
          },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
      },
```
3. babel-loader
   
4. ts-loader

### 바벨의 빌드 과정
1. 파싱 (Parsing)
2. 변환 (Transforming) - 플러그인이 담당
3. 출력 (Printing)

### 바벨 플러그인
1. @babel/plugin-transform-block-scoping
   const, let -> var 로 변경
2. @babel/plugin-transform-arrow-functions
   arrow function -> function()
3. @babel/plugin-transform-strict-mode
   strict mode 추가 해줌
4. 프리셋
   플러그인을 통합, 아래와 같은 방식
   ```javascript
   module.exports = {
    plugins: [
        '@babel/plugin-transform-block-scoping',
        '@babel/plugin-transform-arrow-functions',
        '@babel/plugin-transform-strict-mode'
    ]
    }
   ```
   1. env-preset
        타겟 브라우저

### 웹팩 개발 서버
- 개발환경에서도 운영환경과 유사한 환경을 갖춤으로써 배포시 잠재적 문제 미리 확인,
- ajax 방식의 api 연동은 cors 정책 때문에 반드시 개발서버가 필요
```
npm i --save-dev webpack-dev-server
```
- contentBase: 정적 파일을 제공할 경로, 기본값은 웹팩 아웃풍
- publicPath: 브라우저를 통해 접근하는 경로. 기본값은 '/' 이다.
- host: 개발환경에서 도메인을 맞추어야 하는 상황에서 사용
- overlay: 빌드시 에러나 경고를 브라우저에 표시
- port: 개발서버 포트 설정,
- stats: 메시지 수준을 설정 , 'none', 'errors-only', 'minimal', 'normal', 'verbose',로 수준을 졸절
- historyApiFallBack: 히스토리 api를 사용하는 spa 개발시 설정, 404가 발생하면 index.html로 리다이렉트한다.
- onBeforeSetupMiddleware: 개발용 mock api 설정
- proxy: 서버 프록싱 설정
  ```javascript
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.app.use(apiMocker('/apis', 'mocks/apis'));
      devServer.app.get('/apis/users', (req, res) => {
        // res.header('Access-Control-Allow-Origin', '*');
        res.json();
      });
    },
    proxy: {
      '/apis': 'http://localhost:8080',
    },
  ```
- 개발서버 실행시 --progress를 추가하면 빌드 진행율을 보여준다.

### 핫로딩
- 전체 화면이 아닌 바뀐 화면만 리프레시 해줌으로서 개발을 용이하게 함

### 타입스크립트 설정
1. https://velog.io/@ansrjsdn/TypeScript-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%A4%EC%A0%95
2. https://webpack.kr/guides/typescript/

### 최적화
1. mode를 통한 최적화
2. optimization 속성을 통한 최적화 (webpack5에서는 자동으로 된다.)
   - 수동 설정 방법
```javascript
optimization: {
    minimizer: mode === 'production' ? [
        new OptimizeCSSAssertsPlugin()
    ] : []
}
```
3. splutChunks
```javascript
    // entry가 여러개인 경우 중복을 통합
    splitChunks: {
      chunks: 'all',
    },
```
4. externals
   - 웹팩 빌드 시간 단축 
   - 이미 빌드된 패키지를 사용할 시 다시 빌드하지 않고 node_modules에서 가져올 수 있도록 설정
   - copy-webpack-plugin을 통해 node_modules를 빌드폴더에 복사
```javascript
  externals: {
    axios: 'axios',
  },
```