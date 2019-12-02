import React from 'react';
import {getAllTypes, getAlternative, getExpense, getUser, saveProgress} from "../../Calculator/repository";
import {errorToast} from "../../../utils/helpers";


class CalculatorStatus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            MCAT: false,
            applicationSubmission: false,
            interviewProcess: false,
            reached: []
        };
    }

    async componentDidMount() {
        try {
            const data = await getAllTypes();
            const user = getUser();
            const progress = user.progress;

            let reachedMCAT = false;
            let reachedApplication = false;
            let reachedInterview = false;

            const typeMCAT = data.filter((type) => {
                return type.name === "MCAT"
            })[0].id;
            const typeApplication = data.filter((type) => {
                return type.name === "Application Submission"
            })[0].id;
            const typeInterview = data.filter((type) => {
                return type.name === "Interview Process"
            })[0].id;

            for (const id of progress) {
                let item = await getExpense({ expenseID: id });
                if (item === undefined) {
                    item = await getAlternative({ alternativeID: id });
                }

                try {
                    if (item.typeID === typeMCAT) {
                        reachedMCAT = true;
                    } else if (item.typeID === typeApplication) {
                        reachedApplication = true;
                    } else if (item.typeID === typeInterview) {
                        reachedInterview = true;
                    }
                } catch (e) {
                    const removedInvalid = [...progress].filter(
                        item => item !== id
                    );
                    saveProgress(removedInvalid).catch((err) => {
                        errorToast();
                    });
                    errorToast();
                }
            }

            Promise.all([reachedMCAT, reachedApplication, reachedInterview]).then((res) => {
                this.setState({reached: res, loading: false})
            })
        } catch (e) {
            errorToast();
        }
    }

    render() {
        return this.state.loading ? (
            <div>
                <h2>Calculator Status</h2>
                <p>Loading...</p>
            </div>
        ) : (
            <div>
                <h2>Calculator Status</h2>
                <p>MCAT fees: {this.state.reached[0] ? "saved" : "incomplete"}</p>
                <p>Application submission: {this.state.reached[1] ? "saved" : "incomplete"}</p>
                <p>Interview process: {this.state.reached[2] ? "saved" : "incomplete"}</p>
            </div>

        )
    }
}

export default CalculatorStatus;