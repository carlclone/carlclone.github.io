先联想了一番记忆中的答案,想起了利用排序去重,写出了第一个解,固定两位,查找另外一位,结果是超时了,复杂度是 O(n^3) , 利用二分查找可以把最后一个循环降到 logn

关于去重的问题,先是想到了如果之前该元素如果已经出现过一次了,就跳过, 想法是对的, 但是第一次写的时候没写对 , 要从本次循环的起始元素之后比较
去重的另一个思考方式是, 如果该元素之前已经在本位置出现过,就跳过

最后还是看了解答 , 固定第一位, 然后双指针查找其余两位 , 复杂度是 O(n^2) , 编码过程顺利写出来了

过程中涉及的 problem solving skill :
随机联想

没做好的ps skill:
之前是否做过类似的问题
two sum 的两种解法, 一种是哈希表,不适合这里(不方便去重), 另一种是双指针 , 通过固定一位,成功把问题退化为了 two sum , 但是由于当时做的 two sum 题目没有重复元素 , 思考到了这里可能也解不出来,


其他问题:
变量和函数命名要有意义,做 kth largest 时候记下的教训(j 和 i 肉眼没看清导致 debug 了好久)
不要染上 leetcode 上其他作者一行代码, 乱命名等bad code style

总结:
做完后,一定要做特例检查

```
func threeSum(nums []int) [][]int {
	sort.Ints(nums)
	res:=make([][]int,0)
	start:=0
	for i:=0;i<len(nums);i++ {
		if i>start && nums[i-1]==nums[i] {
			continue
		}

		// 固定一位， 然后 双指针two sum
		lPointer:=i+1
		rPointer:=len(nums)-1
		startL:=i+1
		startR:=len(nums)-1
		for lPointer<rPointer {
			if lPointer>startL && nums[lPointer]==nums[lPointer-1] {
				lPointer++
				continue
			}
			if rPointer<startR && nums[rPointer]==nums[rPointer+1] {
				rPointer--
				continue
			}
			if nums[rPointer]+nums[lPointer]+nums[i]>0 {
				rPointer--
			} else if nums[rPointer]+nums[lPointer]+nums[i]<0 {
				lPointer++
			} else {
				res=append(res,[]int{nums[i],nums[rPointer],nums[lPointer]})
				lPointer++
				rPointer--
			}
		}
	}
	return res
}
```