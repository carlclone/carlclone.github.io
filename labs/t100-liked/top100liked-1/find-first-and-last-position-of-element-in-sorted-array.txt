//本题 edge case 太多 , 还不如直接面写测试用例编程
// 这里用 findMin 的无限逼近思路写还是太 tricky , 因为 findMin 永远都存在一个 min 的数 , 但是这里的数可能不存在, 并且二分也不是精确逼近, 会产生死循环 (l=0 , r=1)
//后面再写一个面向测试用例的 , 之前写过一次,感觉还行
//Input: nums = [5,7,7,8,8,10], target = 8
//Output: [3,4]
func searchRange(nums []int, target int) []int {
	res:=make([]int,2)
	res[0]=-1
	res[1]=-1
	if len(nums)==0 {
		return res
	}
	if len(nums)==1 {
		if nums[0]==target{
			return []int{0,0}
		}
		return res
	}

	// 尝试用 find min 的 无限逼近的思路
	l:=findLeftMost(nums,target)
	r:=findRightMost(nums,target)
	fmt.Println(l,r)

	//try to use dummy

	if (l==-1 || nums[l]<target) && nums[l+1]==target {
		if (r==len(nums) || nums[r]>target) && nums[r-1]==target {
			res[0]=l+1
			res[1]=r-1
		}
	}

	return res
}

// 找到小于 target 的左边第一个位置
func findLeftMost(nums []int,target int) int {

	l:=0
	r:=len(nums)-1

	for l<r {
		mid:=l+ (r-l)/2 +1

		if nums[mid]>=target {
			r=mid-1
		} else {
			l=mid+1
		}
	}

	//其实可以直接在这里得出 left 的值 , 不用到外面再判断

	if l==len(nums) {
		return -1
	}
	if nums[l] == target {
		return l-1
	}
	return l
}


//找到大于 target 的右边第一个位置
func findRightMost(nums []int,target int) int {

	l:=0
	r:=len(nums)-1

	for l<r {
		mid:=l+ (r-l)/2

		if nums[mid]<=target {
			l=mid+1
		} else {
			r=mid-1
		}
	}

	//其实可以直接在这里得出 right 的值 , 不用到外面再判断


	if l==len(nums) {
		return l
	}
	if nums[l]==target {
		return l+1
	}
	return l
}