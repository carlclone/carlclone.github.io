
DP 解
dp (i 点到终点的最小跳) = min (dp(i+ 1~nums[i]))

```
func main() {
	fmt.Println(jump([]int{2, 3, 1, 1, 4}))
}

dp[4] = 0  初始化
dp[3] = 1   dp[3+1] +1 
dp[2] = 2
dp[1] = 1
dp[0] = 1

func jumpp(nums []int) int {
	dp:=make(map[int]int)
	final:=len(nums)-1
	dp[final]=0

	//DP 问题 初始值定义很致命 , 用最大值表示从该点到终点 路线不可达
	for i:=0;i<len(nums)-1;i++ {
		dp[i] = math.MaxInt64
	}

	for i:=final-1;i>=0;i-- {
		for j:=1;j<=nums[i];j++ {
			//
			//if _,ok:=dp[i+j];!ok {continue}
			//如果节点可达,才对比
			if dp[i+j]!=math.MaxInt64 {
				dp[i]=min(dp[i],1+dp[i+j])
			}
		}
	}
	fmt.Println(dp)
	return dp[0]
}

func min(l,r int) int {
	if l>r {
		return r
	}
	return l
}


```


greedy 解:
从右到左,每次都选能跳最远且能到终点的点

memo 解:

DFS 超时解:

```
type Solution struct {
	res        int
	finalIndex int
	nums       []int
}

func (s *Solution) tryJump(startIndex int, remainStep int, timeOfJump int) {
	if startIndex == s.finalIndex {
		if timeOfJump < s.res {
			s.res = timeOfJump
		}
	}
	for i := 1; i <= remainStep; i++ {
		if startIndex+i <= s.finalIndex {
			s.tryJump(startIndex+i, s.nums[startIndex+i], timeOfJump+1)
		}
	}
}

func jump(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	s := Solution{
		res:        math.MaxInt64,
		finalIndex: len(nums) - 1,
		nums:       nums,
	}
	s.tryJump(0, nums[0], 0)
	return s.res
}

```