export const preload = {
    key: 'stampbook-pack',
    url: `assets/media/interface/game/stampbook/stampbook-pack.json`,
    loadString: ['loading', 'Stampbook']
}
// You can write more code here

/* START OF COMPILED CODE */

import BaseContainer from "../../../base/BaseContainer";
import Interactive from "../../../components/Interactive";
import SimpleButton from "../../../components/SimpleButton";
import Button from "../../../components/Button";
import Selectors from "./Selectors";
import Icon from "./thumbs/Icon";
import Pattern from "./thumbs/Pattern";
import Highlight from "./thumbs/Highlight";
import Color from "./thumbs/Color";
import Polaroid from "./Polaroid";
import LoadingPrompt from "../../prompts/LoadingPrompt";
/* START-USER-IMPORTS */
import CategoryItem from "./CategoryItem";
import StampbookAssetLoader from "@engine/loaders/StampbookAssetLoader";
import Stamp from "./Stamp";
/* END-USER-IMPORTS */

export default class Stampbook extends BaseContainer {

    constructor(scene, x, y) {
        super(scene, x ?? 760, y ?? 480);

        // editor_bg_1
        const editor_bg_1 = scene.add.rectangle(0, 0, 1520, 960);
        editor_bg_1.isFilled = true;
        editor_bg_1.fillColor = 0;
        editor_bg_1.fillAlpha = 0.2;
        this.add(editor_bg_1);

        // edit_btn
        const edit_btn = scene.add.image(701, 419, "stampbook", "edit-btn");
        edit_btn.visible = false;
        this.add(edit_btn);

        // editor_bg
        const editor_bg = scene.add.image(0.015380859375, -0.0111083984375, "stampbook", "editor-bg");
        editor_bg.visible = false;
        this.add(editor_bg);

        // front_cover
        const front_cover = scene.add.container(15, 10);
        front_cover.visible = false;
        this.add(front_cover);

        // front_cover_background
        const front_cover_background = scene.add.image(0, 0, "_MISSING");
        front_cover_background.visible = false;
        front_cover.add(front_cover_background);

        // front_cover_clasp
        const front_cover_clasp = scene.add.image(581, 21, "_MISSING");
        front_cover_clasp.visible = false;
        front_cover.add(front_cover_clasp);

        // front_cover_icon
        const front_cover_icon = scene.add.image(561, 13, "_MISSING");
        front_cover_icon.setOrigin(0.5, 0.5039370078740157);
        front_cover_icon.visible = false;
        front_cover.add(front_cover_icon);

        // closebtn
        const closebtn = scene.add.image(576, -317, "stampbook", "closebtn");
        front_cover.add(closebtn);

        // username_text_highlight_2
        const username_text_highlight_2 = scene.add.text(-515, 225, "", {});
        username_text_highlight_2.setOrigin(0, 0.5);
        username_text_highlight_2.alpha = 0.5;
        username_text_highlight_2.alphaTopLeft = 0.5;
        username_text_highlight_2.alphaTopRight = 0.5;
        username_text_highlight_2.alphaBottomLeft = 0.5;
        username_text_highlight_2.alphaBottomRight = 0.5;
        username_text_highlight_2.text = "Penguin8888";
        username_text_highlight_2.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Wide", "fontSize": "108px", "fontStyle": "bold", "shadow.color": "#000000ff" });
        front_cover.add(username_text_highlight_2);

        // username_text_highlight_1
        const username_text_highlight_1 = scene.add.text(-516, 222, "", {});
        username_text_highlight_1.setOrigin(0, 0.5);
        username_text_highlight_1.alpha = 0.5;
        username_text_highlight_1.alphaTopLeft = 0.5;
        username_text_highlight_1.alphaTopRight = 0.5;
        username_text_highlight_1.alphaBottomLeft = 0.5;
        username_text_highlight_1.alphaBottomRight = 0.5;
        username_text_highlight_1.text = "Penguin8888";
        username_text_highlight_1.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Wide", "fontSize": "108px", "fontStyle": "bold", "shadow.color": "#000000ff" });
        front_cover.add(username_text_highlight_1);

        // username_text
        const username_text = scene.add.text(-518, 220, "", {});
        username_text.setOrigin(0, 0.5);
        username_text.text = "Penguin8888";
        username_text.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Big Wide", "fontSize": "108px", "fontStyle": "bold", "shadow.offsetX":-3,"shadow.offsetY":-3,"shadow.color": "#0000008d", "shadow.fill":true});
        front_cover.add(username_text);

        // stampstotal_text_highlight
        const stampstotal_text_highlight = scene.add.text(-260, 307, "", {});
        stampstotal_text_highlight.setOrigin(0, 0.5);
        stampstotal_text_highlight.alpha = 0.5;
        stampstotal_text_highlight.alphaTopLeft = 0.5;
        stampstotal_text_highlight.alphaTopRight = 0.5;
        stampstotal_text_highlight.alphaBottomLeft = 0.5;
        stampstotal_text_highlight.alphaBottomRight = 0.5;
        stampstotal_text_highlight.text = "Total Stamps 888/888";
        stampstotal_text_highlight.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Small", "fontSize": "28px", "fontStyle": "bold", "shadow.color": "#000000ff" });
        front_cover.add(stampstotal_text_highlight);

        // stampstotal_text
        const stampstotal_text = scene.add.text(-262, 305, "", {});
        stampstotal_text.setOrigin(0, 0.5);
        stampstotal_text.text = "Total Stamps 888/888";
        stampstotal_text.setStyle({ "color": "#F4B851", "fontFamily": "Burbank Small", "fontSize": "28px", "fontStyle": "bold", "shadow.offsetX":-2,"shadow.offsetY":-2,"shadow.color": "#0000005e", "shadow.fill":true});
        front_cover.add(stampstotal_text);

        // editor
        const editor = scene.add.container(0, 0);
        editor.visible = false;
        this.add(editor);

        // coverlist
        const coverlist = scene.add.image(50, -439, "stampbook", "coverlist");
        coverlist.setOrigin(0.5003933910306845, 0.5);
        editor.add(coverlist);

        // remove_hint
        const remove_hint = scene.add.image(81, -421, "stampbook", "remove-hint");
        remove_hint.setOrigin(0.5003679175864606, 0.5042735042735043);
        remove_hint.visible = false;
        editor.add(remove_hint);

        // leftbar
        const leftbar = scene.add.container(-695, -280);
        editor.add(leftbar);

        // leftbar_img
        const leftbar_img = scene.add.image(0, 84, "stampbook", "leftbar");
        leftbar_img.setOrigin(0.5, 0.5007407407407407);
        leftbar.add(leftbar_img);

        // blue_stampcat_bg
        const blue_stampcat_bg = scene.add.image(-1, -163, "stampbook", "blue-stampcat-bg");
        blue_stampcat_bg.setOrigin(0.5022222222222222, 0.5);
        leftbar.add(blue_stampcat_bg);

        // stampcat_arrow
        const stampcat_arrow = scene.add.triangle(96, -144.5, 0, 0, 10, 7.5, 0, 15);
        stampcat_arrow.isFilled = true;
        stampcat_arrow.fillColor = 2500134;
        leftbar.add(stampcat_arrow);

        // icon_selector
        const icon_selector = new Selectors(scene, 256, 345);
        icon_selector.visible = false;
        leftbar.add(icon_selector);

        // pattern_selector
        const pattern_selector = new Selectors(scene, 256, 230);
        pattern_selector.visible = false;
        leftbar.add(pattern_selector);

        // highlight_selector
        const highlight_selector = new Selectors(scene, 256, 115);
        highlight_selector.visible = false;
        leftbar.add(highlight_selector);

        // colors_selector
        const colors_selector = new Selectors(scene, 256, 0);
        colors_selector.visible = false;
        leftbar.add(colors_selector);

        // editor_selectors_icon
        const editor_selectors_icon = scene.add.image(20, 345, "stampbook", "editor-selectors");
        editor_selectors_icon.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_icon);

        // editor_selectors_pattern
        const editor_selectors_pattern = scene.add.image(20, 230, "stampbook", "editor-selectors");
        editor_selectors_pattern.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_pattern);

        // editor_selectors_highlight
        const editor_selectors_highlight = scene.add.image(20, 115, "stampbook", "editor-selectors");
        editor_selectors_highlight.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_highlight);

        // editor_selectors_color
        const editor_selectors_color = scene.add.image(20, 0, "stampbook", "editor-selectors");
        editor_selectors_color.setOrigin(0.5038759689922481, 0.5);
        leftbar.add(editor_selectors_color);

        // icon_prefab
        const icon_prefab = new Icon(scene, 21, 345);
        leftbar.add(icon_prefab);

        // pattern_prefab
        const pattern_prefab = new Pattern(scene, 21, 230);
        leftbar.add(pattern_prefab);

        // highlight_prefab
        const highlight_prefab = new Highlight(scene, 21, 115);
        leftbar.add(highlight_prefab);

        // color_prefab
        const color_prefab = new Color(scene, 21, 0);
        leftbar.add(color_prefab);

        // save_btn
        const save_btn = scene.add.image(699, 420, "stampbook", "save-btn");
        save_btn.setOrigin(0.5070422535211268, 0.5);
        editor.add(save_btn);

        // book
        const book = scene.add.container(-672, -377);
        book.visible = false;
        this.add(book);

        // stampbook_bg
        const stampbook_bg = scene.add.image(672, 377, "stampbook", "stampbook-bg");
        book.add(stampbook_bg);

        // insidepage_bg_cntr
        const insidepage_bg_cntr = scene.add.container(672, 377);
        book.add(insidepage_bg_cntr);

        // stampbook_page_background
        const stampbook_page_background = scene.add.image(0, 0, "_MISSING");
        insidepage_bg_cntr.add(stampbook_page_background);

        // pageturn_right
        const pageturn_right = scene.add.image(1284, 657, "stampbook", "pageturn-right");
        pageturn_right.setOrigin(0.5, 0.502283105022831);
        book.add(pageturn_right);

        // pageturn_left
        const pageturn_left = scene.add.image(0, 681, "stampbook", "pageturn-left");
        book.add(pageturn_left);

        // stampbook_closebtn
        const stampbook_closebtn = scene.add.image(1295, 52, "stampbook", "stampbook-closebtn");
        stampbook_closebtn.setOrigin(0.5, 0.5023255813953489);
        book.add(stampbook_closebtn);

        // upper_page_cntr
        const upper_page_cntr = scene.add.container(-88, -103);
        book.add(upper_page_cntr);

        // category_headers_icon
        const category_headers_icon = scene.add.image(233, 131, "_MISSING");
        category_headers_icon.visible = false;
        upper_page_cntr.add(category_headers_icon);

        // header_txt
        const header_txt = scene.add.text(199, 134, "", {});
        header_txt.setOrigin(0, 0.5);
        header_txt.text = "Events";
        header_txt.setStyle({ "color": "#666666", "fontFamily": "Pumpkin", "fontSize": "64px" });
        header_txt.setPadding({"left":100});
        upper_page_cntr.add(header_txt);

        // totalstamps_txt
        const totalstamps_txt = scene.add.text(1152, 105, "", {});
        totalstamps_txt.setOrigin(1, 0.5);
        totalstamps_txt.text = "Total Stamps:";
        totalstamps_txt.setStyle({ "align": "right", "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "32px", "fontStyle": "bold" });
        upper_page_cntr.add(totalstamps_txt);

        // totalstamps_num
        const totalstamps_num = scene.add.text(1152, 145, "", {});
        totalstamps_num.setOrigin(1, 0.5);
        totalstamps_num.text = "888/888";
        totalstamps_num.setStyle({ "align": "right", "color": "#666666", "fontFamily": "Burbank Big Wide", "fontSize": "36px", "fontStyle": "bold" });
        upper_page_cntr.add(totalstamps_num);

        // page_num
        const page_num = scene.add.text(1200, 131, "", {});
        page_num.setOrigin(0, 0.5);
        page_num.text = "Page\n99 of 99";
        page_num.setStyle({ "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "24px" });
        upper_page_cntr.add(page_num);

        // guide
        const guide = scene.add.image(1194, 433, "stampbook", "guide");
        upper_page_cntr.add(guide);

        // polaroids_cntr
        const polaroids_cntr = scene.add.container(973, 217);
        polaroids_cntr.visible = false;
        upper_page_cntr.add(polaroids_cntr);

        // polaroid_bg
        const polaroid_bg = scene.add.image(160, 307, "stampbook", "polaroid-bg");
        polaroid_bg.setOrigin(0.5, 0.5008025682182986);
        polaroids_cntr.add(polaroid_bg);

        // polaroid_3_count_cntr
        const polaroid_3_count_cntr = scene.add.container(238, 496);
        polaroid_3_count_cntr.visible = false;
        polaroids_cntr.add(polaroid_3_count_cntr);

        // polaroid_3_stampcount
        const polaroid_3_stampcount = scene.add.text(0, 0, "", {});
        polaroid_3_stampcount.angle = 10;
        polaroid_3_stampcount.setOrigin(1, 0.5);
        polaroid_3_stampcount.text = "1";
        polaroid_3_stampcount.setStyle({ "align": "right", "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "28px" });
        polaroid_3_count_cntr.add(polaroid_3_stampcount);

        // polaroid_3_stamp
        const polaroid_3_stamp = scene.add.image(16, 3, "stampbook", "polaroid-3-stamp");
        polaroid_3_stamp.setOrigin(0.5, 0.5161290322580645);
        polaroid_3_count_cntr.add(polaroid_3_stamp);

        // polaroid_2_count_cntr
        const polaroid_2_count_cntr = scene.add.container(82, 290);
        polaroid_2_count_cntr.visible = false;
        polaroids_cntr.add(polaroid_2_count_cntr);

        // polaroid_2_stampcount
        const polaroid_2_stampcount = scene.add.text(0, 6, "", {});
        polaroid_2_stampcount.angle = -20;
        polaroid_2_stampcount.setOrigin(1, 0.5);
        polaroid_2_stampcount.text = "1";
        polaroid_2_stampcount.setStyle({ "align": "right", "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "28px" });
        polaroid_2_count_cntr.add(polaroid_2_stampcount);

        // polaroid_2_stamp
        const polaroid_2_stamp = scene.add.image(20, 0, "stampbook", "polaroid-2-stamp");
        polaroid_2_stamp.setOrigin(0.5151515151515151, 0.5151515151515151);
        polaroid_2_count_cntr.add(polaroid_2_stamp);

        // polaroid_1_count_cntr
        const polaroid_1_count_cntr = scene.add.container(250, 112);
        polaroid_1_count_cntr.visible = false;
        polaroids_cntr.add(polaroid_1_count_cntr);

        // polaroid_1_stampcount
        const polaroid_1_stampcount = scene.add.text(0, 0, "", {});
        polaroid_1_stampcount.angle = 10;
        polaroid_1_stampcount.setOrigin(1, 0.5);
        polaroid_1_stampcount.text = "1";
        polaroid_1_stampcount.setStyle({ "align": "right", "color": "#666666", "fontFamily": "Burbank Small", "fontSize": "28px" });
        polaroid_1_count_cntr.add(polaroid_1_stampcount);

        // polaroid_1_stamp
        const polaroid_1_stamp = scene.add.image(18, 4, "stampbook", "polaroid-1-stamp");
        polaroid_1_stamp.setOrigin(0.5, 0.5161290322580645);
        polaroid_1_count_cntr.add(polaroid_1_stamp);

        // polaroid_3_cntr
        const polaroid_3_cntr = scene.add.container(228, 366);
        polaroid_3_cntr.visible = false;
        polaroids_cntr.add(polaroid_3_cntr);

        // polaroid_3_sprite
        const polaroid_3_sprite = new Polaroid(scene, 4, 97);
        polaroid_3_cntr.add(polaroid_3_sprite);

        // polaroid_3
        const polaroid_3 = scene.add.image(0, 113, "stampbook", "polaroid-3");
        polaroid_3_cntr.add(polaroid_3);

        // polaroid_3_tape
        const polaroid_3_tape = scene.add.image(39, 3, "stampbook", "polaroid-3-tape");
        polaroid_3_tape.setOrigin(0.5, 0.5161290322580645);
        polaroid_3_cntr.add(polaroid_3_tape);

        // polaroid_2_cntr
        const polaroid_2_cntr = scene.add.container(0, 192);
        polaroid_2_cntr.visible = false;
        polaroids_cntr.add(polaroid_2_cntr);

        // polaroid_2_sprite
        const polaroid_2_sprite = new Polaroid(scene, 62, 80);
        polaroid_2_cntr.add(polaroid_2_sprite);

        // polaroid_2
        const polaroid_2 = scene.add.image(67, 94, "stampbook", "polaroid-2");
        polaroid_2_cntr.add(polaroid_2);

        // polaroid_2_tape
        const polaroid_2_tape = scene.add.image(-1, 1, "stampbook", "polaroid-2-tape");
        polaroid_2_tape.setOrigin(0.5074626865671642, 0.5);
        polaroid_2_cntr.add(polaroid_2_tape);

        // polaroid_1_cntr
        const polaroid_1_cntr = scene.add.container(241, 0);
        polaroid_1_cntr.visible = false;
        polaroids_cntr.add(polaroid_1_cntr);

        // polaroid_1_sprite
        const polaroid_1_sprite = new Polaroid(scene, 3, 93);
        polaroid_1_cntr.add(polaroid_1_sprite);

        // polaroid_1
        const polaroid_1 = scene.add.image(0, 107, "stampbook", "polaroid-1");
        polaroid_1_cntr.add(polaroid_1);

        // polaroid_1_tape
        const polaroid_1_tape = scene.add.image(30, 0, "stampbook", "polaroid-1-tape");
        polaroid_1_cntr.add(polaroid_1_tape);

        // divider
        const divider = scene.add.image(779, 137, "stampbook", "divider");
        upper_page_cntr.add(divider);

        // stamps_cntr
        const stamps_cntr = scene.add.container(0, 0);
        upper_page_cntr.add(stamps_cntr);

        // stamppage_btns
        const stamppage_btns = scene.add.container(1254, 233);
        stamppage_btns.visible = false;
        upper_page_cntr.add(stamppage_btns);

        // up_arrow
        const up_arrow = scene.add.image(0, 14, "stampbook", "up-arrow");
        up_arrow.setOrigin(0.509090909090909, 0.509090909090909);
        stamppage_btns.add(up_arrow);

        // down_arrow
        const down_arrow = scene.add.image(0, 386, "stampbook", "down-arrow");
        down_arrow.setOrigin(0.509090909090909, 0.509090909090909);
        stamppage_btns.add(down_arrow);

        // loading
        const loading = new LoadingPrompt(scene, 0, 0);
        loading.visible = true;
        this.add(loading);

        // lists
        const usernameItems = [username_text, username_text_highlight_1, username_text_highlight_2];
        const stampsTotalItems = [stampstotal_text, stampstotal_text_highlight];
        const polaroidItemsList = [polaroid_1_cntr, polaroid_2_cntr, polaroid_3_cntr, polaroid_1_count_cntr, polaroid_2_count_cntr, polaroid_3_count_cntr];

        // editor_bg_1 (components)
        new Interactive(editor_bg_1);

        // edit_btn (components)
        const edit_btnSimpleButton = new SimpleButton(edit_btn);
        edit_btnSimpleButton.callback = () => this.editStampbook();

        // editor_bg (components)
        new Interactive(editor_bg);

        // front_cover_clasp (components)
        const front_cover_claspSimpleButton = new SimpleButton(front_cover_clasp);
        front_cover_claspSimpleButton.callback = () => this.showPage(1);

        // closebtn (components)
        const closebtnButton = new Button(closebtn);
        closebtnButton.spriteName = "closebtn";
        closebtnButton.callback = () => this.close();

        // icon_selector (prefab fields)
        icon_selector.selectorType = "Icons";

        // pattern_selector (prefab fields)
        pattern_selector.selectorType = "Patterns";

        // highlight_selector (prefab fields)
        highlight_selector.selectorType = "Highlights";

        // icon_prefab (prefab fields)
        icon_prefab.rootModule = true;

        // pattern_prefab (prefab fields)
        pattern_prefab.rootModule = true;

        // highlight_prefab (prefab fields)
        highlight_prefab.rootModule = true;

        // color_prefab (prefab fields)
        color_prefab.rootModule = true;

        // save_btn (components)
        const save_btnSimpleButton = new SimpleButton(save_btn);
        save_btnSimpleButton.callback = () => this.saveStampbook();

        // pageturn_right (components)
        const pageturn_rightButton = new Button(pageturn_right);
        pageturn_rightButton.spriteName = "pageturn-right";
        pageturn_rightButton.callback = () => this.turnPage(1);

        // pageturn_left (components)
        const pageturn_leftButton = new Button(pageturn_left);
        pageturn_leftButton.spriteName = "pageturn-left";
        pageturn_leftButton.callback = () => this.turnPage(-1);

        // stampbook_closebtn (components)
        const stampbook_closebtnButton = new Button(stampbook_closebtn);
        stampbook_closebtnButton.spriteName = "stampbook-closebtn";
        stampbook_closebtnButton.callback = () => this.close();

        // up_arrow (components)
        const up_arrowButton = new Button(up_arrow);
        up_arrowButton.spriteName = "up-arrow";
        up_arrowButton.callback = () => this.showPreviousStampPage();

        // down_arrow (components)
        const down_arrowButton = new Button(down_arrow);
        down_arrowButton.spriteName = "down-arrow";
        down_arrowButton.callback = () => this.showNextStampPage();

        this.editor_bg_1 = editor_bg_1;
        this.edit_btn = edit_btn;
        this.editor_bg = editor_bg;
        this.front_cover_background = front_cover_background;
        this.front_cover_clasp = front_cover_clasp;
        this.front_cover_icon = front_cover_icon;
        this.front_cover = front_cover;
        this.icon_selector = icon_selector;
        this.pattern_selector = pattern_selector;
        this.highlight_selector = highlight_selector;
        this.colors_selector = colors_selector;
        this.icon_prefab = icon_prefab;
        this.pattern_prefab = pattern_prefab;
        this.highlight_prefab = highlight_prefab;
        this.color_prefab = color_prefab;
        this.leftbar = leftbar;
        this.editor = editor;
        this.stampbook_page_background = stampbook_page_background;
        this.insidepage_bg_cntr = insidepage_bg_cntr;
        this.category_headers_icon = category_headers_icon;
        this.header_txt = header_txt;
        this.totalstamps_txt = totalstamps_txt;
        this.totalstamps_num = totalstamps_num;
        this.page_num = page_num;
        this.guide = guide;
        this.polaroid_3_stampcount = polaroid_3_stampcount;
        this.polaroid_3_count_cntr = polaroid_3_count_cntr;
        this.polaroid_2_stampcount = polaroid_2_stampcount;
        this.polaroid_2_count_cntr = polaroid_2_count_cntr;
        this.polaroid_1_stampcount = polaroid_1_stampcount;
        this.polaroid_1_count_cntr = polaroid_1_count_cntr;
        this.polaroid_3_sprite = polaroid_3_sprite;
        this.polaroid_2_sprite = polaroid_2_sprite;
        this.polaroid_1_sprite = polaroid_1_sprite;
        this.polaroids_cntr = polaroids_cntr;
        this.stamps_cntr = stamps_cntr;
        this.up_arrow = up_arrow;
        this.down_arrow = down_arrow;
        this.stamppage_btns = stamppage_btns;
        this.upper_page_cntr = upper_page_cntr;
        this.book = book;
        this.loading = loading;
        this.usernameItems = usernameItems;
        this.stampsTotalItems = stampsTotalItems;
        this.polaroidItemsList = polaroidItemsList;

        /* START-USER-CTR-CODE */
        this.loader = new StampbookAssetLoader(this.scene);
        this.interface.stampbook = this;

        this.leftbar.onZoneOver = (id, caller) => {
            [this.icon_selector, this.pattern_selector, this.highlight_selector, this.colors_selector].forEach(selector => {
                selector.visible = false;
                selector.preventingClose = [];
            });

            let selector;
            switch (caller) {
                case "icon":
                    selector = this.icon_selector;
                    break;
                case "pattern":
                    selector = this.pattern_selector;
                    break;
                case "highlight":
                    selector = this.highlight_selector;
                    break;
                default:
                    selector = this.colors_selector;
                    break;
            }
            if (!selector.inited) {
                selector.init();
                selector.inited = true;
            }
            selector.visible = true;
            selector.preventClose(this);
        }

        this.leftbar.onZoneOut = (id, caller) => {
            let selector;
            switch (caller) {
                case "icon":
                    selector = this.icon_selector;
                    break;
                case "pattern":
                    selector = this.pattern_selector;
                    break;
                case "highlight":
                    selector = this.highlight_selector;
                    break;
                default:
                    selector = this.colors_selector;
                    break;
            }
            selector.unpreventClose(this);
        }

        this.loading.close = () => this.close();

        this.loading.showWithoutProgress("Loading Stampbook")
        this.network.events.once("get_stampbook_data", (data) => this.init(data));

        this.network.send("get_stampbook_data", { id: this.interface.stampbookId });

        /* END-USER-CTR-CODE */
    }

    /** @type {Phaser.GameObjects.Rectangle} */
    editor_bg_1;
    /** @type {Phaser.GameObjects.Image} */
    edit_btn;
    /** @type {Phaser.GameObjects.Image} */
    editor_bg;
    /** @type {Phaser.GameObjects.Image} */
    front_cover_background;
    /** @type {Phaser.GameObjects.Image} */
    front_cover_clasp;
    /** @type {Phaser.GameObjects.Image} */
    front_cover_icon;
    /** @type {Phaser.GameObjects.Container} */
    front_cover;
    /** @type {Selectors} */
    icon_selector;
    /** @type {Selectors} */
    pattern_selector;
    /** @type {Selectors} */
    highlight_selector;
    /** @type {Selectors} */
    colors_selector;
    /** @type {Icon} */
    icon_prefab;
    /** @type {Pattern} */
    pattern_prefab;
    /** @type {Highlight} */
    highlight_prefab;
    /** @type {Color} */
    color_prefab;
    /** @type {Phaser.GameObjects.Container} */
    leftbar;
    /** @type {Phaser.GameObjects.Container} */
    editor;
    /** @type {Phaser.GameObjects.Image} */
    stampbook_page_background;
    /** @type {Phaser.GameObjects.Container} */
    insidepage_bg_cntr;
    /** @type {Phaser.GameObjects.Image} */
    category_headers_icon;
    /** @type {Phaser.GameObjects.Text} */
    header_txt;
    /** @type {Phaser.GameObjects.Text} */
    totalstamps_txt;
    /** @type {Phaser.GameObjects.Text} */
    totalstamps_num;
    /** @type {Phaser.GameObjects.Text} */
    page_num;
    /** @type {Phaser.GameObjects.Image} */
    guide;
    /** @type {Phaser.GameObjects.Text} */
    polaroid_3_stampcount;
    /** @type {Phaser.GameObjects.Container} */
    polaroid_3_count_cntr;
    /** @type {Phaser.GameObjects.Text} */
    polaroid_2_stampcount;
    /** @type {Phaser.GameObjects.Container} */
    polaroid_2_count_cntr;
    /** @type {Phaser.GameObjects.Text} */
    polaroid_1_stampcount;
    /** @type {Phaser.GameObjects.Container} */
    polaroid_1_count_cntr;
    /** @type {Polaroid} */
    polaroid_3_sprite;
    /** @type {Polaroid} */
    polaroid_2_sprite;
    /** @type {Polaroid} */
    polaroid_1_sprite;
    /** @type {Phaser.GameObjects.Container} */
    polaroids_cntr;
    /** @type {Phaser.GameObjects.Container} */
    stamps_cntr;
    /** @type {Phaser.GameObjects.Image} */
    up_arrow;
    /** @type {Phaser.GameObjects.Image} */
    down_arrow;
    /** @type {Phaser.GameObjects.Container} */
    stamppage_btns;
    /** @type {Phaser.GameObjects.Container} */
    upper_page_cntr;
    /** @type {Phaser.GameObjects.Container} */
    book;
    /** @type {LoadingPrompt} */
    loading;
    /** @type {Phaser.GameObjects.Text[]} */
    usernameItems;
    /** @type {Phaser.GameObjects.Text[]} */
    stampsTotalItems;
    /** @type {Phaser.GameObjects.Container[]} */
    polaroidItemsList;

    /* START-USER-CODE */

    get totalPages() {
        return this.crumbs.stamps.length + 1;
    };

    init(playerdata) {
        this.playerdata = playerdata;
        this.updateColor(this.playerdata.color);
        this.updatePattern(this.playerdata.pattern);
        this.updateHighlight(this.playerdata.highlight);
        this.updateIcon(this.playerdata.clasp);
        this.usernameItems.forEach(item => item.text = this.playerdata.nickname);
        this.stampsTotalItems.forEach(item => item.text = `Total Stamps ${this.playerdata.stamps.length}/${this.world.totalStampsAvailable}`);

        this.front_cover.visible = true;
        this.edit_btn.visible = this.interface.stampbookId == this.world.client.id;
        this.loading.visible = false;
    }

    editStampbook() {
        this.editor_bg.visible = true;
        this.editor.visible = true;
        this.front_cover_clasp.disableInteractive();
    }

    saveStampbook() {
        this.editor_bg.visible = false;
        this.editor.visible = false;
        this.front_cover_clasp.setInteractive();
    }

    close() {
        for (let event of ["Color", "Pattern", "Highlight", "Icon"]) {
            this.interface.events.off(`updateStampbook${event}`);
        }
        this.interface.destroyWidget(this)
    }

    updateColor(id) {
        id = parseInt(id);
        if (id == this.color_prefab.id) return;
        this.playerdata.color = id;
        this.front_cover_background.visible = false;
        this.loader.loadColorPattern(`${id}_${this.playerdata.pattern}`, () => {
            this.front_cover_background.setTexture(`stampbook-assets/color-patterns/${id}_${this.playerdata.pattern}`)
            this.front_cover_background.visible = true;
        });
        this.interface.events.emit("updateStampbookColor", id);
        this.color_prefab.setId(id);
        if (!this.crumbs.cover.color_highlight[id].includes(this.playerdata.highlight)) {
            this.updateHighlight(this.crumbs.cover.color_highlight[id][0]);
            this.highlight_selector.init();
        }

        if (this.interface.stampbookId == this.world.client.id) {
            this.network.send("update_stampbook", { color: id });
        }
    }

    updatePattern(id) {
        id = parseInt(id);
        if (id == this.pattern_prefab.id) id = 0;
        this.playerdata.pattern = id;
        this.front_cover_background.visible = false;
        this.loader.loadColorPattern(`${this.playerdata.color}_${id}`, () => {
            this.front_cover_background.setTexture(`stampbook-assets/color-patterns/${this.playerdata.color}_${id}`)
            this.front_cover_background.visible = true;
        });
        this.interface.events.emit("updateStampbookPattern", id);
        this.pattern_prefab.setId(id);

        if (this.interface.stampbookId == this.world.client.id) {
            this.network.send("update_stampbook", { pattern: id });
        }
    }

    updateHighlight(id) {
        id = parseInt(id);
        if (id == this.highlight_prefab.id) return
        this.playerdata.highlight = id;
        this.front_cover_clasp.visible = false;
        this.loader.loadHighlight(id, () => {
            this.front_cover_clasp.setTexture(`stampbook-assets/highlight/${id}`)
            this.front_cover_clasp.visible = true;
        });
        this.interface.events.emit("updateStampbookHighlight", id);
        this.highlight_prefab.setId(id);
        this.usernameItems.forEach(item => item.setColor(this.crumbs.cover.highlight[id]));
        this.stampsTotalItems.forEach(item => item.setColor(this.crumbs.cover.highlight[id]));

        if (this.interface.stampbookId == this.world.client.id) {
            this.network.send("update_stampbook", { highlight: id });
        }
    }

    updateIcon(id) {
        id = parseInt(id);
        if (id == this.icon_prefab.id) return;
        this.playerdata.clasp = id;
        this.front_cover_icon.visible = false;
        this.loader.loadClasp(id, () => {
            this.front_cover_icon.setTexture(`stampbook-assets/clasp/${id}`)
            this.front_cover_icon.visible = true;
        });
        this.interface.events.emit("updateStampbookIcon", id);
        this.icon_prefab.setId(id);

        if (this.interface.stampbookId == this.world.client.id) {
            this.network.send("update_stampbook", { clasp: id });
        }
    }

    getPageData(page) {
        return this.crumbs.stamps[page-1];
    }

    getStampsByGroupId(id) {
        let stamps = [];
        this.crumbs.stamps.forEach(category => {
            if (category.parent_group_id == id) {
                stamps = stamps.concat(this.getStampsByGroupId(category.group_id));
            }

            if (category.group_id == id) {
                stamps = stamps.concat(category.stamps);
            }
        });
        return stamps;
    }

    getOwnedStampsByGroupId(id) {
        return this.getStampsByGroupId(id).filter(stamp => this.playerdata.stamps.includes(stamp.stamp_id));
    }

    showPage(page) {
        if (page < 0 || page > this.totalPages) return;
        if (page == this.current_page) return;
        this.current_page = page;

        if (page == 0) {
            this.book.visible = false;
            this.front_cover.visible = true;
            this.edit_btn.visible = this.interface.stampbookId == this.world.client.id;;
            return;
        }


        if (page == this.totalPages) {
            this.stampbook_page_background.visible = false;
            this.loader.loadInsidePagesBackground("10000", () => {
                this.stampbook_page_background.setTexture(`stampbook-assets/inside-pages-background/10000`);
                this.stampbook_page_background.visible = true;
            });
            this.upper_page_cntr.visible = false;
            return
        }

        this.upper_page_cntr.visible = true;

        this.page_num.text = `Page\n${page} of ${this.totalPages}`;

        this.front_cover.visible = false;
        this.book.visible = true;
        this.edit_btn.visible = false;

        const data = this.getPageData(page);
            const stampsPage = data.stamps.length > 0;

        this.category_headers_icon.visible = false;

        if (page == 1) {
            this.guide.visible = true;
            this.header_txt.text = "Contents";
            this.header_txt.setPadding(0, 0, 0, 0);
        } else {
            this.guide.visible = false;
            this.header_txt.text = data.name;
            this.header_txt.setPadding(100, 0, 0, 0);
            this.loader.loadCategoryHeader(data.group_id, () => {
                this.category_headers_icon.setTexture(`stampbook-assets/category-headers/${data.group_id}`);
                this.category_headers_icon.visible = true;
            });
        }

        this.totalstamps_txt.text = `${data.name}${!stampsPage ? ' Stamps' : ''}:`;
        this.header_txt.setFontSize(stampsPage ? 48 : 64);
        this.totalstamps_num.text = `${this.getOwnedStampsByGroupId(data.group_id).length}/${this.getStampsByGroupId(data.group_id).length}`;
        this.stampbook_page_background.visible = false;
        this.loader.loadInsidePagesBackground(data.group_id, () => {
            this.stampbook_page_background.setTexture(`stampbook-assets/inside-pages-background/${data.group_id}`);
            this.stampbook_page_background.visible = true;
        });

        if (this.crumbs.polaroids[data.group_id]) {
            this.showPolaroids(data.group_id);
        } else {
            this.polaroids_cntr.visible = false;
        }

        if (stampsPage) {
            this.showStamps(data.stamps);
        } else {
            this.showCategories(data.group_id);
        }
    }

    turnPage(direction) {
        this.showPage(this.current_page + direction);
    }

    showPolaroids(group_id) {
        const polaroids = this.crumbs.polaroids[group_id].polaroids;
        const stamps = this.getOwnedStampsByGroupId(group_id).length;
        this.polaroids_cntr.visible = true;
        this.polaroidItemsList.forEach(item => item.visible = false);
        for (let i = 0; i < 3; i++){
            const polaroid = polaroids[i];
            if (polaroid) {

                if (stamps >= polaroid.stamp_count) {
                    // Set polaroid.
                } else {
                    this[`polaroid_${i + 1}_stampcount`].text = polaroid.stamp_count;
                    this[`polaroid_${i + 1}_count_cntr`].visible = true;
                    break; // Only show next polaroid to unlock.
                }
            }
        }
    }

    goToCategory(category) {
        this.showPage(this.crumbs.stamps.findIndex(cat => cat.group_id == category) + 1);
    }

    showStamps(stamps) {
        this.stamps_cntr.removeAll(true);
        this.stamps_cntr.pages = [];
        this.stamps_cntr.currentPage = -1;
        stamps = stamps.sort((a, b) => {
            if (a.rank === b.rank) {
                return a.stamp_id - b.stamp_id;
            }
            return a.rank - b.rank;
        });
        stamps.forEach((stamp, i) => {
            const pageWidth = 4
            const page = Math.floor(i / (4 * pageWidth));
            const stampItem = new Stamp(this.scene, 175 * (i % pageWidth) + 250, 260 + Math.floor(i % (4 * pageWidth) / pageWidth) * 165);
            if (this.getPageData(this.current_page).group_id == 22) {
                stampItem.setAward(stamp);
            } else {
                stampItem.setStamp(stamp);
            }
            this.stamps_cntr.add(stampItem);
            if (!this.stamps_cntr.pages[page]) this.stamps_cntr.pages[page] = [];
            this.stamps_cntr.pages[page].push(stampItem);
        });
        this.showNextStampPage();

        this.stamppage_btns.visible = this.stamps_cntr.pages.length > 1;

        this.down_arrow.x = -350;
        this.up_arrow.x = -350;
        this.down_arrow.y = 510;
        this.up_arrow.y = 0;
    }

    showCategories(group_id) {
        this.stamps_cntr.removeAll(true);
        this.stamps_cntr.pages = [];
        this.stamps_cntr.currentPage = -1;
        const categories = this.crumbs.stamps.filter(cat => cat.parent_group_id == group_id);
        categories.forEach((category, i) => {
            const pageWidth = categories.length > 8 ? 3 : 2;
            const page = Math.floor(i / (5 * pageWidth));
            const categoryItem = new CategoryItem(this.scene, 350 * (i % pageWidth) + 200, 250 + Math.floor(i % (5 * pageWidth) / pageWidth) * 90);
            categoryItem.setCategory(category.group_id);
            this.stamps_cntr.add(categoryItem);
            if (!this.stamps_cntr.pages[page]) this.stamps_cntr.pages[page] = [];
            this.stamps_cntr.pages[page].push(categoryItem);
        });
        this.showNextStampPage();
        this.stamppage_btns.visible = this.stamps_cntr.pages.length > 1;

        this.down_arrow.x = 0;
        this.up_arrow.x = 0;
        this.down_arrow.y = 386;
        this.up_arrow.y = 14;
    }

    showNextStampPage() {
        if (this.stamps_cntr.pages.length <= 1) return;

        this.stamps_cntr.pages.forEach(page => page.forEach(item => item.visible = false));
        this.stamps_cntr.currentPage++;
        if (this.stamps_cntr.currentPage >= this.stamps_cntr.pages.length) this.stamps_cntr.currentPage--;
        this.stamps_cntr.pages[this.stamps_cntr.currentPage].forEach(item => item.visible = true);

        this.down_arrow.visible = this.stamps_cntr.currentPage < this.stamps_cntr.pages.length - 1;
        this.up_arrow.visible = this.stamps_cntr.currentPage > 0;
    }

    showPreviousStampPage() {
        if (this.stamps_cntr.pages.length <= 1) return;

        this.stamps_cntr.pages.forEach(page => page.forEach(item => item.visible = false));
        this.stamps_cntr.currentPage--;
        if (this.stamps_cntr.currentPage < 0) this.stamps_cntr.currentPage = 0;
        this.stamps_cntr.pages[this.stamps_cntr.currentPage].forEach(item => item.visible = true);

        this.down_arrow.visible = this.stamps_cntr.currentPage < this.stamps_cntr.pages.length - 1;
        this.up_arrow.visible = this.stamps_cntr.currentPage > 0;
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
