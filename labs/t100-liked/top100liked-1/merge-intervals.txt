//如果 interviewer 要求你写能 work 的代码 , 这个能记得住吗?

//所以建议多熟悉一门语言, 比如 python , 代码量小
type byLength [][]int

func (s byLength) Len() int {
	return len(s)
}
func (s byLength) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s byLength) Less(i, j int) bool {
	return s[i][0] < s[j][0]
}

//TODO; brute force 的 graph 方法也要写一遍

//Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
//Output: [[1,6],[8,10],[15,18]]
//Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
func merge(intervals [][]int) [][]int {
	if len(intervals)==0 {
		return intervals
	}
	//如果俩数组有重合的地方,就合并 , 什么特性的两个数字会重合 ,   一个数组的左边界 小于 另一个数字的右边界 , 画图 , 也有可能不重合,
	//这题是 case 分析题 ,需要仔细分析

	//go 的自定义 sort 方法
	sort.Sort(byLength(intervals))


	//和之前做的 tcp 的 segment merge 一样 , tcp 里用 tree 或者 graph 更好 , 写频繁
	res:=make([][]int,0)

	res=append(res,intervals[0])

	//compare 对象搞错了
	for i:=1;i<len(intervals);i++ {
		rightEdge:=res[len(res)-1][1]
		leftEdge:=intervals[i][0]

		if overlap(rightEdge,leftEdge) {
			newInterval :=mergeTwo(res[len(res)-1],intervals[i])
			res[len(res)-1]= newInterval
		} else {
			res=append(res,intervals[i])
		}
	}
	return res
}

/*
[1,3] [2,4]
i=3 j=2
res=true
 */
func overlap(i,j int) bool {
	if j<=i {
		return true
	}
	return false
}

//在每个函数注释,写上输入参数 example , 是个好习惯
/*
interval1=[1,3]
interval2=[2,4]
res=[1,4]
 */
func mergeTwo(interval1 ,interval2 []int) []int {
	//合并内容错了
	if interval1[1] < interval2[1] {
		interval1[1] = interval2[1]
	}
	return interval1
}
