这题折腾了我好久,很多需要细心分析的 sub-problem 没有做好,比如 partition 函数的实现, 将索引转换成第x 大

这道题记住的教训:
因为 i 和 j 在我用的字体里长的太像,导致 debug 的时候没看到写错了, 排查了好久 , 从此之后各种变量名都不敢简写和乱命名了
需要纸笔+test case 耐心分析的 sub-problem , 都拆到一个子函数去解决, 方便单独测试,逻辑更加清晰, 比如这里的 partition 和 transToKthLarge
partition 里的变量初始化和开闭区间定义困扰我很久,但这个问题其实用几个最简特例带入一下就可以分析出来,同时写之前要把定义写在注释里

涉及的 ps skill:
这题其实几年前做过,所以靠仅存的记忆联想起来了

反过来推导/倒推, 这题也可以使用倒推, 简化思维负担(transToKthLarge的编写) , 不过现在看来没什么必要,只是转移了索引->kth 的转换 代码编写位置
特例启发 (最简用例) , 每题必用的策略 , 但有时候不奏效

总结:
不要乱命名
边界,区间问题用特例检查
sub-problem 取出来单独处理

```
func partition(nums []int, start int, end int) int {
	pIndex :=start
	pValue :=nums[pIndex]

	lessPointer :=start

	for i:=start+1;i<=end;i++ {
		if nums[i] < pValue {
			nums[lessPointer+1],nums[i]=nums[i],nums[lessPointer+1]
			lessPointer++
		}
	}
	nums[lessPointer],nums[pIndex]=nums[pIndex],nums[lessPointer]
	return lessPointer
}

func findKthLargest(nums []int, k int) int {

	start:=0
	end:=len(nums)-1
	return findKthLargestIn(nums,start,end,k)

}

func findKthLargestIn(nums []int, start int, end int, k int) int{
	pIndex :=partition(nums,start,end)

	currKthLarge :=transToKthLarge(len(nums), pIndex)
	if k== currKthLarge {
		return nums[pIndex]
	}
	if k< currKthLarge {
		return findKthLargestIn(nums, pIndex+1,end,k)
	}
	if k> currKthLarge {
		return findKthLargestIn(nums,start, pIndex-1,k)
	}
	return 0
}

//第p+1小 = 第 len(nums)- (p+1) +1 大
func transToKthLarge(count int,index int) int {
	return count-(index+1)+1
}
```