# Thứ tự parse các thành phần trong trang web

## Ví dụ 1 (css ở head)

Link: http://localhost:5000/vi-du-1

```pug
html
  head
    link(rel="stylesheet", href="/home_10s.css")
  body
    h1 hoang 123
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_10s.css` ở head và tiến hành tải thêm
- sau khi tải xong css ở head, html bắt đầu render và apply css

## Ví dụ 2 (css ở body)

Link: http://localhost:5000/vi-du-2

```pug
html
  head
  body
    h1 hoang 123
    link(rel="stylesheet", href="/home_5s.css")
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_5s.css` ở body và tiến hành tải thêm
- trong lúc tải thêm, phần nội dung phía trước `home_5s.css` sẽ được render (`hoang 123` được render lên trình duyệt)
- trong khi file css được tải về, trình duyệt không render phần tiếp theo
- sau khi tải xong, trình duyệt tiếp tục render `hoang 456` và apply css

## Ví dụ 3 (css ở cả head và body)

Link: http://localhost:5000/vi-du-3

```pug
html
  head
    link(rel="stylesheet", href="/home_5s.css")
  body
    h1 hoang 123
    link(rel="stylesheet", href="/home_10s.css")
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_5s.css` ở head và `home_10s.css` ở body và tiến hành tải thêm
- sau khi tải xong css ở head, trình duyệt tiến hành render (`hoang 123` được render lên trình duyệt và apply `home_5s.css`)
- sau khi tải xong css ở body, trình duyệt tiến hành render tiếp (`hoang 456` được render lên trình duyệt và apply `home_10s.css`)

_Note_: css ở head load xong thì trình duyệt mới render. Nếu thời gian load file css ở head lâu hơn ở body thì trình duyệt vẫn sẽ là trang trắng dù css ở body đã load xong trước css ở head

# Ví dụ 4 (có script ở head)

Link: http://localhost:5000/vi-du-4

```pug
html
  head
    script(src="/home_5s.js")
  body
    h1 hoang 123
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_5s.js` ở head và tiến hành tải thêm
- sau khi tải xong script ở head, trình duyệt tiến hành render (`hoang 123` và `hoang 456` được render lên trình duyệt, script được thực thi)

# Ví dụ 5 (có script ở body)

Link: http://localhost:5000/vi-du-5

```pug
html
  head
  body
    h1 hoang 123
    script(src="/home_5s.js")
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_5s.js` ở body và tiến hành tải thêm
- trong lúc tải thêm, phần nội dung phía trước `home_5s.js` sẽ được render (`hoang 123` được render lên trình duyệt)
- trong khi file script được tải về, trình duyệt không render phần tiếp theo
- sau khi tải xong, trình duyệt thực thi script và render `hoang 456`

# Ví dụ 6 (có script ở head và body)

Link: http://localhost:5000/vi-du-6

```pug
html
  head
    script(src="/home_5s.js")
  body
    h1 hoang 123
    script(src="/home_8s.js")
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy `home_5s.js` ở head và `home_8s.js` ở body và tiến hành tải thêm
- sau khi tải xong script ở head, trình duyệt tiến hành render (`home_5s.js` được thực thi `hoang 123` được render)
- sau khi tải xong script ở body, trình duyệt tiếp tục tiến hành render (`home_8s.js` được thực thi và `hoang 456` được render)

_Note_: script ở head không thể truy cập vào các node DOM ở body, vì nó được thực thi trước khi các node DOM đó được tạo ra. Tương tự, script ở body cũng không thể truy cập vào các node DOM ở phía sau nó

# Ví dụ 7 (có cả script và css)

Link: http://localhost:5000/vi-du-7

```pug
html
  head
    link(rel="stylesheet", href="/home_5s.css")
    script(src="/home_5s.js")
  body
    h1 hoang 123
    link(rel="stylesheet", href="/home_10s.css")
    script(src="/home_8s.js")
    h2 hoang 456
```

- file html sẽ được tải về
- khi đọc file html, trình duyệt thấy script và css, và tiến hành tải thêm
- html được render từ trên xuống dưới, vì vậy nó sẽ render cho tới trước file đang load và chờ, khi file đó được load xong, nó sẽ render tiếp cho tới vị trí file đang load tiếp theo
- sau khi `home_5s.css` và `home_5s.js` được tải xong, `home_5s.js` được thực thi, `hoang 123` được render, css trong `home_5s.css` được apply
- sau đó, `home_8s.js` được tải xong, tuy nhiên, `home_10s.css` chưa tải xong nên nó k được thực thi
- sau khi `home_10s.css` được tải xong, `home_8s.js` được thực thi và `hoang 456` được render

_Note_:

- nếu file css phía trước load lâu hơn, file css phía sau sẽ không được apply cho tới khi file trước load xong
- nếu script phía trước load lâu hơn thì script phía sau sẽ không được thực thi cho tới khi file trước load xong
- nếu file css đứng trước file script và load lâu hơn thì file script phía sau sẽ không được thực thi cho tới khi file trước load xong
- nếu file script đứng trước file css và load lâu hơn thì file css cũng phía sau sẽ không được apply cho tới khi file trước load xong
- css, script trong head sẽ được apply và thực thi trước so với css, script trong body

# Một số attribute của thẻ script

`async`: Với script thông thường, nếu có thuộc tính `async`, thì script đó sẽ được fetch song song (parallel) với quá trình parse, và nó sẽ được thực thi ngay sau khi script được fetch xong

Với `module scripts`, nếu có thuộc tính `async`, thì script đó và tất cả dependencies của nó sẽ được thực thi trong `defer queue`, vì vậy nó cũng sẽ được fetch song song với quá trình parse, và nó sẽ được thực thi ngay sau khi script được fetch xong

Thuộc tính này cho phép loại bỏ việc chặn parse khi trình duyệt đang tải script trước khi tiếp tục parse. Thuộc tính `defer` cũng có hiệu ứng tương tự

`defer`: chỉ định cho trình duyệt biết là script đó chỉ được thực thi sau khi parse hoàn tất, nhưng trước khi bắn event DOMContentLoaded

Script có thuộc tính `defer` sẽ ngăn DOMContentLoaded được bắn ra cho tới khi script đó được thực thi và kết thúc

_Warning_: thuộc tính `defer` không được sử dụng nếu không có thuộc tính `src`, trong trường hợp này, `defer` không có tác dụng. `defer` cũng k có tác dụng với `module script` - vì nó mặc định đã `defer`

Script với `defer` sẽ thực thi theo thứ tự từ trên xuống, như thứ tự mà nó xuất hiện. Thuộc tính này cũng cho phép loại bỏ việc chặn parse khi trình duyệt đang tải script trước khi tiếp tục parse

## So sánh async với defer

`async`:

- cho phép script được tải song song với quá trình parse

- thực thi ngay khi load xong

`defer`:

- cho phép script được tải song song với quá trình parse

- thực thi sau khi quá trình parse hoàn tất (không tính tới việc download hình ảnh)

- thực thi tuần tự theo thứ tự xuất hiện

![async vs. defer](https://user-images.githubusercontent.com/40981446/226522842-13d2b1be-cd38-45d4-9ee2-abd1c6866fad.png)
