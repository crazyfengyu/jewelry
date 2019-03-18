/**
 * Created by 21213 on 2019/3/8.
 */
function Page(ele, json) {
    this.target = document.querySelector(ele);
    this.pageIndex = 1;
    this.data = {
        "next": "下一页",
        "prev": "上一页",
        "dataCount": 100,
        "showNum": 5,
        "showPage": 5,
        "callback": function (pageIndex) {

        }
    };
    this.extend(json);
    this.create();
    this.bindData();
}

Page.prototype.extend = function (json) {
    Object.assign(this.data, json);
};

Page.prototype.bindEvent = function () {
    var that = this;
    this.prevBtn.className = "page_prev";
    this.nextBtn.className = "page_next";
    this.prevBtn.onclick = function () {
        that.pageIndex--;
        that.bindData();
    };
    this.nextBtn.onclick = function () {
        that.pageIndex++;
        that.bindData();
    };
};

Page.prototype.bindData = function () {
    var that = this;
    var maxPageIndex = Math.ceil(this.data["dataCount"] / this.data["showNum"]);
    var midlleIndex = Math.floor(this.data["showPage"] / 2);
    var start = 1;
    var end = this.data["showPage"] > maxPageIndex ? maxPageIndex : this.data["showPage"];

    if (this.pageIndex > midlleIndex) {
        start = this.pageIndex - midlleIndex;
        end = this.pageIndex + midlleIndex;
    }

    if (this.pageIndex > maxPageIndex - midlleIndex) {
        start = maxPageIndex - this.data["showPage"] + 1;
        end = maxPageIndex;
    }

    start = start < 1 ? 1 : start;

    this.content.innerHTML = "";
    for (var i = start; i <= end; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        if (i == this.pageIndex) {
            li.className = "selected";
        }
        this.content.appendChild(li);

        li.onclick = function () {
            that.pageIndex = this.innerHTML * 1;
            that.bindData();
        };
    }
    this.target.style.width = li.offsetWidth*end + this.prevBtn.offsetWidth * 2 + end * 10 + "px";
    this.bindEvent();
    if (this.pageIndex == maxPageIndex) {
        this.nextBtn.onclick = null;
        this.nextBtn.className = "page_next disabled";
    }
    if (this.pageIndex == 1) {
        this.prevBtn.onclick = null;
        this.prevBtn.className = "page_prev disabled";
    }

    if (this.data["callback"]) {
        this.data["callback"](this.pageIndex);
    }
};

Page.prototype.create = function () {

    this.target.className = "box";

    this.prevBtn = document.createElement("span");
    this.prevBtn.className = "page_prev";
    this.prevBtn.innerHTML = this.data["prev"];
    this.target.appendChild(this.prevBtn);

    this.content = document.createElement("ul");
    this.content.className = "page_content";
    this.target.appendChild(this.content);

    this.nextBtn = document.createElement("span");
    this.nextBtn.className = "page_next";
    this.nextBtn.innerHTML = this.data["next"];
    this.target.appendChild(this.nextBtn);
};
