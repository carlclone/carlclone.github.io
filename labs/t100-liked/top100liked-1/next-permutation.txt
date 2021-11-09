

这个解法,其实算是数学逻辑推理+证明,得到的规律 , 我的弱项
同时了解到字典序的概念
字典序是生成全排列的其中一种方法
生成全排列可以穷举各种可能, 实现成本较低的一种方法

//把台式机 onetab 查阅的资料都存到这里
func nextPermutation(nums []int)  {
	end:=len(nums)-1
	partitionNumIdx:=0

	//找到第一个 r->l 逆序的元素索引
	i:=end-1
	for ;i>=0;i-- {
		if nums[i]<nums[i+1] {
			partitionNumIdx=i
			break
		}
	}

	//没有r->l 逆序元素 ， 直接reverse整个
	if i==-1 {
		reverse(nums,0,len(nums)-1)
		return
	}

	//找到第一个r->l比partitionNumber大的元素索引
	changeNumberIdx:=0
	for i:=end;i>partitionNumIdx;i-- {
		if nums[i]>nums[partitionNumIdx] {
			changeNumberIdx=i
            break
		}

	}

	swap(nums,partitionNumIdx,changeNumberIdx)

	reverse(nums,partitionNumIdx+1,end)


}


func reverse(nums []int,l,r int) {
	for l<r {
		nums[l],nums[r]=nums[r],nums[l]
		l++
		r--
	}
}

func swap(nums []int,l,r int) {
	nums[l],nums[r]=nums[r],nums[l]
}