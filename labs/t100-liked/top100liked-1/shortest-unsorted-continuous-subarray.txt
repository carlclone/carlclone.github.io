func findUnsortedSubarray(nums []int) int {
	origin:=[]int{}
	for _,v:=range nums {
		origin=append(origin,v)
	}
	sort.Ints(nums)
	l:=-1
	r:=-1
	for k,_:=range origin {
		if origin[k]!=nums[k] && l==-1 {
			l=k
		}
		if origin[k]!=nums[k] {
			r=k
		}
	}
	if l==-1 || r ==-1 {
		return 0
	}
	return r-l+1
}