

// 从 leetcode 上得到的找最小值方法 , 很巧妙 , 比官方解答减少了许多代码 , 
//其实我也想到了一样的思路, 二分无限逼近最小, 两个指针相等的时候就是最小值, 但是没写对

//就两种 case, 跟最右的比 , 比他大就在右边, 否则在左边 , 无限逼近
func findSmallestEleIndex(nums []int) (index int) {
	lo:=1
	hi:=len(nums)-1
	for(lo<hi){
		mid:=(lo+hi)/2;
		if(nums[mid]>nums[hi]) {
			lo=mid+1
		} else {
		    //这里有点特殊 ,  应该算小于等于, 有可能 mid 就是最小值
			hi=mid
		}
	}
	return lo
}


//Input: nums = [4,5,6,7,0,1,2], target = 0
//Output: 4

// [4]
func search(nums []int, target int) int {

	p := findSmallestEleIndex(nums)
	if p == 0 {
		return bs(nums, 0, len(nums)-1,target)
	}

	if target >= nums[0] && target <= nums[p-1] {
		return bs(nums, 0, p-1,target)
	} else {
		return bs(nums, p, len(nums)-1,target)
	}
}


func bs(nums []int,l,r int,target int) (value int) {
	for l<=r {
		mid:=(l+r)/2
		if nums[mid]==target {
			return mid
		} else if nums[mid]>target {
			return bs(nums,l,mid-1,target)
		} else {
			return bs(nums,mid+1,r,target)
		}
	}
	return -1
}