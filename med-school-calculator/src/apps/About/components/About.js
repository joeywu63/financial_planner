import React from 'react';
import img from 'img/aboutus.jpg';
import styled from 'styled-components';

const PageWrapper = styled.div`
`;

const Card = styled.div`
    margin: 0 100px 0 100px;
    padding: 20px 50px 20px 50px;
    background-color: white;
`;

const TextDiv = styled.div`
    width: 100%;
`;

const Image = styled.img`
    width: 35%;
    max-height: auto;
    margin-top: 3em;
    margin-bottom: 30px;
    margin-left: 50px;
    float: right;
`;

const Title = styled.h1`
    font-weight: 500;
    font-size: 32px;
    margin-bottom: 30px;
`;

const Subtitle = styled.h3`
    font-weight: 500;
    font-size: 24px;
`;

class About extends React.Component {
    render() {
        return (
            <PageWrapper>
                <Card>
                <Title>Community of Support</Title>
                <Image src={img} />
                <TextDiv>
                    <Subtitle>About Us</Subtitle>
                    <p>
                        The MD Program is committed to the principles of equity
                        and diversity and we recognize the importance of having
                        a health care community that reflects the diversity of
                        Canadian society.
                    </p>

                    <p>
                        The Community of Support (COS) is a collaborative and
                        longitudinal initiative that support students who are
                        Indigenous, Black, Filipino, economically disadvantaged,
                        or who self-identify with having a disability at every
                        stage of their journey to medical school. Being a member
                        of the Community of Support will provide you with access
                        to the following opportunities:
                    </p>

                    <p>
                        • Admissions information: one-on-one advising and access
                        to admissions events
                    </p>

                    <p>
                        • Access to mentors (medical students, physicians) and
                        experiences (enrichment courses, and leadership,
                        research and volunteer opportunities)
                    </p>
                    <p>
                        • Support at each stage of the application process – i)
                        MCAT preparation, ii) 1-1 support with the medical
                        school application, and iii) school-specific interview
                        preparation
                    </p>

                    <p>
                        <span>
                            If you are interested in this opportunity, please
                            complete the{' '}
                        </span>
                        <a
                            href="https://mentorcity.com/en/sign_up?invitation_token=a7f3b0aab047db889569bc4d48effa21"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Community of Support form.
                        </a>
                    </p>

                    <Subtitle>Data Privacy</Subtitle>
                    <p>
                        Thank you for your interest in the Community of Support.
                    </p>
                    <p>
                        <span>
                            The University of Toronto respects your privacy.
                            Personal information collected from the Community of
                            Support Form is collected to provide you with access
                            to suitable mentors, to provide you with admissions
                            information, and to connect you to other relevant
                            opportunities. At all times this information will be
                            protected in accordance with the Freedom of
                            Information and Protection of Privacy Act. If you
                            have questions, please refer to{' '}
                        </span>
                        <a
                            href="https://www.utoronto.ca/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.utoronto.ca/privacy
                        </a>
                        <span>
                            {' '}
                            or contact the University Freedom of Information and
                            Protection of Privacy Coordinator at 416-946-7303,
                            McMurrich Building, room 201, 12 Queen’s Park
                            Crescent West, Toronto, ON, M5S 1A8.
                        </span>
                    </p>
                </TextDiv>
                </Card>
            </PageWrapper>
        );
    }
}

export default About;
