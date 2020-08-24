<template>
    <div class="page-pagination" v-if="total_page > 1">
        <ul >
            <li @click="handlePage(pre_page)" v-if="pre_page"> <i class="far alireview-fa-chevron-left"></i> </li>
            <li v-for="(page, index) in paginationListPage"
                :key="index"
                :id="page"
                @click="handlePage(page)"
                :class="{'active' : current_page == page, 'disable' : typeof page !== 'number'}">
                {{page}}
            </li>
            <li @click="handlePage(next_page)" v-if="next_page"> <i class="far alireview-fa-chevron-right"></i> </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'current_page',
        'total_page',
        'pre_page',
        'next_page'
    ],
    computed: {
        paginationListPage() {
            return this.pagination(this.current_page, this.total_page)
        }
    },
    methods: {
        getRange (start, end) {
            return Array(end - start + 1)
                .fill()
                .map((v, i) => i + start)
        },
        pagination (currentPage, pageCount) {
            let delta
            if (pageCount <= 10) {
                // delta === 10: [1 2 3 4 5 6 7 8 9 10]
                delta = 10
            } else {
                // delta === 2: [1 ... 4 5 6 ... 10]
                // delta === 4: [1 2 3 4 5 ... 10]
                delta = currentPage > 8 && currentPage < pageCount - 7 ? 6 : 8
            }

            const range = {
                start: Math.round(currentPage - delta / 2),
                end: Math.round(currentPage + delta / 2)
            }

            if (range.start - 1 === 1 || range.end + 1 === pageCount) {
                range.start += 1
                range.end += 1
            }

            let pages =
                currentPage > delta
                ? this.getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount))
                : this.getRange(1, Math.min(pageCount, delta + 1))

            const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value])

            if (pages[0] !== 1) {
                pages = withDots(1, [1, '...']).concat(pages)
            }

            if (pages[pages.length - 1] < pageCount) {
                pages = pages.concat(withDots(pageCount, ['...', pageCount]))
            }
            return pages
        },
        handlePage(page){
            this.$emit('onChoosePage', page)
        }
    }
}
</script>

<style scoped>
.page-pagination{
    background-color: #f0f0f7;
    padding: 30px 0;
}
.page-pagination ul{
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: flex-end;
}
.page-pagination ul li{
    font-size: 13px;
    font-weight: normal;
    color: #4d4f5c;
    padding: 7px 10px;
    min-width: 34px;
    min-height: 34px;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: center;
    margin: 4px;
    border: solid 1px #e8e9ec;
    border-radius: 4px;
    cursor: pointer;
}

.page-pagination ul li:last-child{
    margin-right: 0;
}

.page-pagination ul li.active{
    background-color: #242538;
    color: #fff;
    border-color: #f0f0f7;
    pointer-events: none;
    cursor: none;
}

.page-pagination ul li:hover{
    background-color: #eeeeee;
    border-color: #ddd;
}
.page-pagination ul li.disable{
    pointer-events: none;
}
</style>