<template>
    <div>
        <p v-if="!isContainVersion">并没有这个版本哦~</p>
        <Table v-else border stripe :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="link">
                <Button type="default" @click="download(index)">下载</Button>
            </template>
        </Table>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '名称',
                        key: 'name',
                        width: 200
                    },
                    {
                        title: '发布日期',
                        key: 'date',
                        width: 200
                    },
                    {
                        title: '简介',
                        key: 'description'
                    },
                    {
                        title: '文件大小',
                        key: 'size',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '下载',
                        slot: 'link',
                        width: 120,
                        align: 'center'
                    }
                ],
                versions: {},
            }
        },
        computed: {
            isContainVersion: function() {
                for (let i in this.versions) {
                    if (this.versions[i].name === this.$route.params.name){
                        return true
                    }
                }
                return false
            },
            currentVersionIndex: function() {
                for (let i in this.versions) {
                    if (this.versions[i].name === this.$route.params.name){
                        return i
                    }
                }
            },
            data: function () {
                if (this.isContainVersion) {
                    return this.versions[this.currentVersionIndex].sub_versions
                }
                return []
            }
        },
        methods: {
            download: function(index) {
                window.location.href = this.versions[this.currentVersionIndex].sub_versions[index].link
                this.$Notice.success({
                    title: '正在下载',
                    desc: 'The desc will hide when you set render.',
                    render: h => {
                        return h('span', [
                            '你的下载正在进行中'
                        ])
                    }
                })
            },
            getdata: function() {
                axios.get('/static/versions.json').then(response => {
                    this.versions = response.data
                }, response => {

                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.getdata()
            })
        }

    }
</script>

<style scoped>

</style>