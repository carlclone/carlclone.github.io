// dp(i,j)=min(dp(i−1,j),dp(i−1,j−1),dp(i,j−1))+1.          maximal square      , 用 brute force 和 dp 都写一遍

/*
    0 1
	1 0

	res:1
 */

func maximalSquare(matrix [][]byte) int {
	if len(matrix)==0 {
		return 0
	}
	dp:=make([][]int,len(matrix))
	for i,_:=range dp {
		dp[i] = make([]int,len(matrix[0]))
	}

	//初始化第一行和第一列
	for i:=0;i<len(matrix[0]);i++ {
		if matrix[0][i]=='1' {
			dp[0][i] = 1
		} else {
			dp[0][i] = 0
		}
	}

	for i:=0;i<len(matrix);i++ {
		if matrix[i][0]=='1' {
			dp[i][0]=1
		} else {
			dp[i][0]=0
		}
	}

	//从第二行,第二列开始 i 是行,k 是列
	for i:=1;i<len(matrix);i++ {
		//k 又写成了 i
		for k:=1;k<len(matrix[0]);k++ {
			//if matrix[i][j]==1  dp(i,j)=min(dp(i−1,j),dp(i−1,j−1),dp(i,j−1))+1
			//else                dp[i][j]=0
			if matrix[i][k]=='0' {continue}
			dp[i][k] = min(dp[i-1][k],dp[i-1][k-1],dp[i][k-1]) +1
		}
	}

	max:=0
	for i:=0;i<len(matrix);i++ {
		//k 又写成了 i
		for k:=0;k<len(matrix[0]);k++ {
			if dp[i][k]>max {
				max=dp[i][k]
			}
		}
	}
	return max*max
}


func min(nums... int) int {
	if len(nums)<1 {
		panic("")
	}

	min:=nums[0]
	for k,v:=range nums {
		if k==0 {continue}
		if v<min {
			min=v
		}
	}
	return min
}
