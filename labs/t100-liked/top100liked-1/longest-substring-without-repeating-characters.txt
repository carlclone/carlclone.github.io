
问题好大啊, 滑动窗口没有掌握好, 自己边思考边写也没写对



```
func lengthOfLongestSubstring(s string) int {
	l,r:=0,0
	longest,currLongest:=0,0
	m:=make(map[uint8]bool)
	for r<len(s) {
		m[s[r]]=true
		currLongest=r-l+1
		if currLongest>longest {longest=currLongest}
		r++

		for r<len(s) && m[s[r]]==true {
			delete(m,s[l])
			l++
		}
	}
	return longest
}

```


想不到,或者写起来容易出 bug 的话, 用数据结构牺牲空间来简化写法 ,一般情况下会更好理解
使用队列的方式思考滑动窗口
Google: 滑动窗口的本质
https://www.jianshu.com/p/99269af9af49
之前看的 labuladong 的模板,稍微改了一下写出上面那个,并不好理解,那肯定是他教的不好(邪笑),找了另一篇文章,从队列的角度思考,这一瞬间我就记住再也忘不了了

```
func lengthOfLongestSubstring(s string) int {
	l,r:=0,-1
	longest,currLongest:=0,0
	m:=make(map[uint8]bool)
	for r+1<len(s) {
		r++
		
		//元素出队 , 驱逐元素为入队做准备
		for r<len(s) && m[s[r]]==true {
			delete(m,s[l])
			l++
		}
		//元素入队
		m[s[r]]=true
		currLongest=r-l+1
		if currLongest>longest {longest=currLongest}
	}
	return longest
}

```