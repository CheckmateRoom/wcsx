import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import surface from './module/surface/surface'

Vue.use(Vuex);

export default new Vuex.Store({
	mutations,
	modules:{ //相当于state，包含状态数据 
		surface
	}
});