# gitignore匹配规则
1. 直接单词匹配
> 屏蔽所有dist目录和文件
  ```javascript
  dist
  ```

2. 以/开头表示目录
> 屏蔽a目录下的dist目录和文件
  ```javascript
  a/dist
  ```

3. 以/结尾表示目录
> 屏蔽a目录下的所有文件
  ```javascript
  a/
  ```

4. *匹配0个或多个字符
> 屏蔽dist目录下的所有txt文件,无法匹配“/”字符
  ```javascript
  dist/*.txt
  ```

5. **匹配0个或多个目录
> 屏蔽a目录下任意深度的所有txt文件
  ```javascript
  a/**/*.txt
  ```

6. ？匹配一个字符
> 屏蔽a目录下的一个字符的txt文件,
  ```javascript
  a/?.txt
  ```

7. []匹配任意一个字符
> 屏蔽a目录下的一个字符且为数字的txt文件
  ```javascript
  a/[0-9].txt
  ```

8. !匹配不忽略的文件或目录
> 屏蔽a目录下的所有txt文件,但是不屏蔽a目录下的a.txt文件
  ```javascript
  a/*.txt
  !a/a.txt
  ```
场景：用户需要上传一些文件需要一个目录用于存储，但是不希望这个目录被git管理，这时候就可以使用`.gitignore`文件来忽略这个目录，但是这个目录又不能被git忽略，这时候需要建一个`.gitkeep`文件,用!忽略此文件，使目录被git管理。