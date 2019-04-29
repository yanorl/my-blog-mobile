import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		user: null,
		page: 1
	},
	mutations:{
		setUser(state, user){
			state.user = user
		}
	},
	getters: {
	    uid({user}) {
	      if (user) return user.id;
	      return null;
	    }
	},
	actions: {
	    exit(context){
	      context.commit('setUser', null);
	    },
	    login(context, user){
	      context.commit('setUser', user);
	    }
  }
});