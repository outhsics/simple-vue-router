class HistoryRoute {
  constructor() {
    this.current = null;
  }
}

class VueRouter {
  constructor(options) {
    this.mode = options.mode || "hash";
    this.routers = options.routers || [];
    this.routesMap = this.createMap(this.routers);
    this.history = new HistoryRoute();
    this.init();
  }
  init() {
    if (this.mode === "hash") {
      // hash
      location.hash ? "" : (location.hash = "/");
      window.addEventListener("load", () => {
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? "" : (location.pathname = "/");
      window.addEventListener("load", () => {
        this.history.current = location.pathname.slice(1);
      });
      window.addEventListener("pathnamechange", () => {
        this.history.current = location.pathname.slice(1);
      });
    }
  }
  go() {}
  back() {}
  push() {}

  createMap(routers) {
    return routers.reduce((memo, current) => {
      memo[current.path] = current.component;
      return memo;
    }, {});
  }
}
VueRouter.install = function(Vue, opts) {
  console.log("Vue", Vue);
  console.log("opts", opts);
  Vue.mixin({
    beforeCreate() {
      // console.log(this.$options.name);

      if (this.$options && this.$options.router) {
        // root
        this._root = this;
        this._router = this.$options.router;
        // observer
        Vue.util.defineReactive(this, "xxx", this._router);
      } else {
        this._root = this.$parent._root;
      }
      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        }
      });
      Object.defineProperty(this, "$route", {
        get() {
          return this._root._router.history.current;
        }
      });
    }
  });

  Vue.component("router-link", {
    props: {
      to: String,
      tag: String
    },
    methods: {
      handleClick() {
        alert("1");
      }
    },

    render() {
      let mode = this._self._root._router.mode;
      let tag = this.tag;

      return (
        <tag
          on-click={this.handleClick}
          href={mode === "hash" ? `#${this.to}` : this.to}
        >
          {this.$slots.default}
        </tag>
      );
    }
  });
  Vue.component("router-view", {
    render(h) {
      console.log(this, "2");
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      console.log(current);
      return h(routeMap[current]);
    }
  });
};
export default VueRouter;
