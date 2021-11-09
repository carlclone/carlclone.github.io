
总结:
用了注释, write down thought process 来提高自己的缓存, 确实有帮助到思考
有印象的一道题, 在写的过程中慢慢想起来, 本来是想分开两个循环两种基点类型写的
在推理 startPoint 的地方用时较长, 应该用特例带入先测 sub-problem 的

一个条件判断的地方写错了,算是逻辑错误吧,容忍了 `	if s[j]==s[k] && calLen(j,k)>currLongestLen {`

```
//beat 51% time    beat 37% mem
// ab   aba      0 表示该字母  , 1 表示a 和 b 之间的缝隙 , 耐心一点推出来吧
func longestPalindrome(s string) string {
	if len(s)==0 && len(s)==1 {
		return s
	}

	currLongestLeft:=-1
	currLongestRight:=-1
	currLongestLen:=0

	//以字母该点为基点, 两个指针向两边扩散
	for i:=0;i<2*len(s);i++ {
		j:= calStartLeftPoint(i)
		k:= calStartRightPoint(i)
		for j>=0 && k<len(s) {
			//如果相等,则是一个新的p 串,如果比之前的还长,记录下来
			if s[j]==s[k]  {
				if calLen(j,k)>currLongestLen {
					currLongestLeft=j
					currLongestRight=k
					currLongestLen=calLen(j,k)
				}
			} else {
				//如果不相等,终止这个基点的扩散
				break
			}
			//继续扩散
			j=expandToLeft(j)
			k=expandToRight(k)
		}
	}
	return cutStr(s,currLongestLeft,currLongestRight)
}


func calStartLeftPoint(i int) int {
	if i%2==0 {
		return i/2
	}
	return (i)/2
}
func calStartRightPoint(i int) int {
	if i%2==0 {
		return i/2
	}
	return i/2+1
}


func calLen(l,r int) int {
	return r-l+1
}

func expandToLeft(i int) int {
	return i-1
}
func expandToRight(i int) int {
	return i+1
}

func cutStr(s string,l,r int) string {
	return s[l:r+1]
}

```