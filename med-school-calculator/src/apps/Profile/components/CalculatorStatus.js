import React from 'react';
import {
    getAllTypes,
    getAlternative,
    getExpense,
    getUser,
    saveProgress
} from 'apps/Calculator/repository';
import { errorToast } from 'utils/helpers';
import RouterButton from 'common/RouterButton';
import Spinner from 'common/Spinner';

class CalculatorStatus extends React.Component {
    state = {
        loading: true,
        MCAT: false,
        applicationSubmission: false,
        interviewProcess: false,
        all: false,
        reached: []
    };

    async componentDidMount() {
        try {
            const data = await getAllTypes();
            const user = getUser();
            const progress = user.progress;

            let reachedMCAT = false;
            let reachedApplication = false;
            let reachedInterview = false;

            const typeMCAT = data.filter(type => {
                return type.name === 'MCAT';
            })[0].id;
            const typeApplication = data.filter(type => {
                return type.name === 'Application Submission';
            })[0].id;
            const typeInterview = data.filter(type => {
                return type.name === 'Interview Process';
            })[0].id;

            for (const id of progress) {
                let item = await getExpense({ expenseID: id });
                if (item === undefined) {
                    item = await getExpense({
                        expenseID: (await getAlternative({ alternativeID: id }))
                            .expenseID
                    });
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
                    saveProgress(removedInvalid).catch(err => {
                        errorToast();
                    });
                    errorToast();
                }
            }

            Promise.all([reachedMCAT, reachedApplication, reachedInterview])
                .then(res => {
                    this.setState({ reached: res, loading: false });
                    const all =
                        reachedMCAT && reachedApplication && reachedInterview;
                    this.setState({ all: all });
                })
                .catch(error => {
                    errorToast();
                });
        } catch (e) {
            errorToast();
        }
    }

    render() {
        return this.state.loading ? (
            <div>
                <h2>Calculator Progress</h2>
                <Spinner />
            </div>
        ) : (
            <div>
                <h2>Calculator Progress</h2>
                <p>
                    MCAT fees:{' '}
                    {this.state.reached[0]
                        ? 'selections made'
                        : 'no selections'}
                </p>
                <RouterButton
                    link={'/calculator'}
                    title={'Go to MCAT section'}
                    state={{ currentStage: 'MCAT' }}
                />
                <p>
                    Application submission:{' '}
                    {this.state.reached[1]
                        ? 'selections made'
                        : 'no selections'}
                </p>
                <RouterButton
                    link={'/calculator'}
                    title={'Go to Application Submission section'}
                    state={{ currentStage: 'Application Submission' }}
                />
                <p>
                    Interview process:{' '}
                    {this.state.reached[2]
                        ? 'selections made'
                        : 'no selections'}
                </p>
                <RouterButton
                    link={'/calculator'}
                    title={'Go to Interview Process section'}
                    state={{ currentStage: 'Interview Process' }}
                />
                <p>All sections complete: {this.state.all ? 'yes' : 'no'}</p>
                <RouterButton
                    link={'/calculator'}
                    title={'Go to Costs Breakdown'}
                    state={{ currentStage: 'Breakdown' }}
                />
            </div>
        );
    }
}

export default CalculatorStatus;
