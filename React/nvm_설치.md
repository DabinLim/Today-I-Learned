# Mac Os 에서 nvm 설치하기
설치부터 1시간 이상 막혀 있었으므로 나중에 새로운 맥을 구매했을때 편하게 설치하기 위해 기록으로 남겨둠

## nvm 설치 (node version manager)
<br><br>

### 1. 설치

```
$ brew install nvm
```
또는
```
$ sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```
이지만 home brew 로 다운 받았을때는 분명 잘 다운 받았고 다시 한번 명령어를 입력하면 already installed 되었다고 나오는데 환경변수를 설정해주었음에도 nvm 명령어가 작동하지 않았다<br><br>
이렇게

```
-zsh: nvm: command not found
```
<br>
<br>


### 2. 버전 확인

```
$ nvm --version
-zsh: nvm: command not found
```

거의 대부분의 경우는 오류가 나는 것 같으므로 오류 메세지도 같이 적었다.
처음 nvm을 설치했을때 저 둘은 세트다.<br>
<br><br>

### 3. 환경변수 설정

사실 어려운 일은 아니다.

```
$ vi ~/.zshrc  # zsh 
$ vi ~/.bash_profile # bash
```
이렇게 vi 에디터로 편집해도 좋고
이미 코드가 있는지 확인하기 쉽게

```
$ code ~/.zshrc  # zsh 
$ code ~/.bash_profile # bash
```

vscode 에서 열어도 좋다 하지만 미리 설정해두지 않았다면

```
-zsh: code: command not found
```

기분이 더 나빠질수도 있다.<br>
code 명령어는 [노마드코더 iterm,vscode 셋팅](https://www.youtube.com/watch?v=GZzBH3ZRP4s&t=342s)에서 설정할 수 있으며 터미널도 이쁘게 꾸밀 수 있다.<br><br>
아무튼 .zshrc 파일을 열면<br>
<img src="https://github.com/DabinLim/Today-I-Learned/blob/master/images/swp.png">
<br>
이런 무시무시한 화면을 보게 될 수도 있는데<br>
두려워 하지 말고 D를 눌러 삭제한다.<br>
swap은 파일을 수정할 때 컴퓨터가 갑자기 꺼지거나 하는 등 문제가 생겨서 파일을 정상 수정 못했을 때를 대비한 파일인데 여기다가 그냥 코드를 붙여넣으면 nvm 명령어는 작동하지 않는다.
<br><br>
여기를 지나면 다음은 .zshrc 파일을 보게 될텐데 이 파일의 내용은 모르고 지웠다가 큰 곤란을 겪을 수 있으므로 가장 아래로 내려가

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

코드를 복붙 해주고 저장한다음

```
source ~./zshrc # zsh
source ~./bash_profile # bash
```

저장한 내용을 적용시킨다.<br>
vi 에디터의 경우 수정을 위해서 i를 눌러야 되며 복붙이 끝났다면 esc를 눌러 수정을 끝낸 후에 :wq + enter로 에디터를 빠져나오면 된다.<br>
vscode로 수정하는 경우 중요한 다른 코드들을 지우지 않도록 주의 한다.
<br><br>


### 4. 성공

```
$ nvm --version
0.33.뭐시기

```

