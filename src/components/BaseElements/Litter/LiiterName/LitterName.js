import React, {Component} from "react";
import CatAge from "../../Cat/CatAge/CatAge";
import CatName from "../../Cat/CatName/CatName";

class LitterName extends Component {
    render() {
        if(!this.props.litter.id){
            return "..."
        }else {
            return (
                <>
                    Помет "{this.props.litter.letter}" (<CatAge withoutAge={true}
                                                                birthday={this.props.litter.birthday}/>) <CatName
                    cat={this.props.litter.father}/> + <CatName cat={this.props.litter.mother}/>
                </>
            );
        }
    }
}

export default LitterName;
