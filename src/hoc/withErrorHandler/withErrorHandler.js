import React ,{Component} from 'react'
import Modal from '../../Components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary'
//import axios from '../../axios-orders'
const WithErrorHandler =(WrappedComponent,axios)=>
{
    return class extends Component {
        state={
            error:null
        }
        componentWillMount(){
            axios.interceptors.request.use(request=>
                {
                    this.setState(
                        {
                            error:null
                        }
                    )
                    return request;
                })
            axios.interceptors.response.use(null,error=>{
                this.setState(
                    {
                        error:error
                    }
                )
            })
        }
        clickHandler=()=>
        {
            this.setState(
                {
                    error:null
                }
            )
        }
        render(){
            console.log(this.state.error)
            return(
                <Auxilary>
        <Modal 
        show={this.state.error}
        backDropClick={this.clickHandler}
        >{this.state.error ? this.state.error.message:null}</Modal>
                <WrappedComponent {...this.props} />
                </Auxilary>
            )
        }
   
    }
}

export default WithErrorHandler;
