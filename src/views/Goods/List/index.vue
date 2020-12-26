<template>
  <div class="goodslist-container">
    <!-- 面包屑导航 -->
    <Breadcrumb :navArr="navArr" />

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="12">
        <el-col :span="8">
          <!-- 查询商品输入框 -->
          <el-input v-model="queryInfo.query" @keydown.enter="getGoodsList(state)" clearable
            placeholder="请输入需要查询的商品的名称">
            <template #append>
              <el-button icon="el-icon-search" @click="getGoodsList(state)"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加商品按钮 -->
          <el-button type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表表格展示区域 -->
      <el-table :data="goodsList" border stripe style="margin: 20px auto;">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500px">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间" width="160px">
          <template #default="scope">
            {{dateFormat(scope.row.add_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <!-- 删除 -->
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteGoods(scope.row.goods_id)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum" :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { getGoodsList, deleteGoodsReq } from '@/config/http.js'
import dateFormat from '@/util/dateFormat'

export default {
  components: { Breadcrumb },
  setup () {
    const { $confirm, $msg, $router } = getCurrentInstance().ctx
    const state = reactive({
      // 面包屑导航参数
      navArr: ['商品管理', '商品列表'],
      // 商品列表请求参数
      queryInfo: {
        // 查询参数
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10
      },
      // 商品列表总条数
      total: 0,
      // 商品列表数据
      goodsList: []
    })

    // 获取商品列表数据
    getGoodsList(state)

    // 每页条数改变时触发
    const handleSizeChange = (newSize) => {
      state.queryInfo.pagesize = newSize
      getGoodsList(state)
    }
    // 当前页改变时触发
    const handleCurrentChange = (newPage) => {
      state.queryInfo.pagenum = newPage
      getGoodsList(state)
    }

    // 删除商品
    const deleteGoods = (id) => {
      $confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteGoodsReq(id)
        getGoodsList(state)
      }).catch(() => {
        $msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    return { ...toRefs(state), state, getGoodsList, handleSizeChange, handleCurrentChange, dateFormat, deleteGoods, $router }
  }
}
</script>

<style lang="scss">
.goodslist-container {
  .cell {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
