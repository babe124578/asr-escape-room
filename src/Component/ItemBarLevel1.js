import React, { Component } from "react";
import "../CSS/ItemBarLevel1.css"
class ItemBarLevel1 extends Component {

    render() {
        return (
            <table className="inventory">
                <tr>
                    <td align="center">
                        {/*<img id="item0" class="hidden" draggable="true" ondrag="inventory(this)" src="images/item0.jpg" />*/}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                         {/*<img id="item1" class="hidden" draggable="true" ondrag="inventory(this)" src="images/item1.jpg" />*/}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                         {/*<img id="item2" class="hidden" draggable="true" ondrag="inventory(this)" src="images/item2.jpg" />*/}
                    </td>
                </tr>
                <tr>
                    <td align="center">
                         {/*<img id="item3" class="hidden" draggable="true" ondrag="inventory(this)" src="images/item3.jpg" />*/}
                    </td>
                </tr>
            </table>
        );
    }
}

export default ItemBarLevel1;


