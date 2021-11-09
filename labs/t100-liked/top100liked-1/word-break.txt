//Example 1:
//
//Input: s = "leetcode", wordDict = ["leet","code"]
//Output: true
//Explanation: Return true because "leetcode" can be segmented as "leet code".
//Example 2:
//
//Input: s = "applepenapple", wordDict = ["apple","pen"]
//Output: true
//Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
//Note that you are allowed to reuse a dictionary word.
//Example 3:
//
//Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
//Output: false

//Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
//Output: false


// 算法/编程中的开闭区间问题
https://www.jianshu.com/p/88333f1f02a7
chrome-extension://ikhdkkncnoglghljlkmcimlnlhkeamad/pdf-viewer/web/viewer.html?file=https%3A%2F%2Fwww.cs.utexas.edu%2Fusers%2FEWD%2Fewd08xx%2FEWD831.PDF#=&zoom=110.00000000000001
https://www.zhihu.com/question/61054439
https://blog.csdn.net/wingWC/article/details/78229684
https://www.cnblogs.com/fighlone/p/13526864.html
http://www.cppblog.com/woaidongmao/archive/2008/12/25/70343.aspx


/*
思路: 可以用 trie 树 ,  字符串匹配+查找问题 , 或者DFS穷举 , 或者字典排序后 , 简单穷举

trie 树提高查找效率 , 然后用 dp
dfs
这题 , 特例法的话就是 "cat" ['ca','t','at'] , 并且需要拆出 sub-problem , 免得被困住 , wordMatch(i,j,dict) , 还有 dp 部分

特例法+问题拆解

dp 法:

根据之前的(可能是每个,也可能是一个)状态推出现在的状态

0到 i 是否匹配 = (0-i-1是否匹配 && i是否匹配 ) || (0~i-2是否匹配 && i-1 ~ i 是否匹配)

dp 定义 2: 0到 i 是否匹配
dp 0 = false
1=false
2=true
3=true

interview 的时候, 等你想了这么久, 早就挂彩了

建议直接用 DFS 写
 */
func wordBreak(s string, wordDict []string) bool {
	dp:=make([]bool,len(s)+1)
	dp[0]=true

	m:=make(map[string]bool)
	for _,v:=range wordDict {
		m[v]=true
	}

	// dp 定义是开区间 (0,i) 是否匹配 , 开区间的定义,少了很多条件判断
	for i:=1;i<=len(s);i++ {
		for j:=1;j<=i;j++ {
			if (dp[i-j]) && wordMatch(s,i-j,i-1,m) {
				dp[i]=true
				break
			}
		}
	}
	return dp[len(s)]
}

func wordMatch(str string,i,j int,m map[string]bool) bool {
	cand:=str[i:j+1]
	_,ok:=m[cand]
	if ok {
		return true
	}
	return false
}