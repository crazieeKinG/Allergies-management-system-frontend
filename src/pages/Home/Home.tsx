import { Col, Typography } from "antd";

const Home = () => {
    return (
        <div>
            <Col span={15}>
                <Typography.Title level={2}>OVERVIEW</Typography.Title>
                <Typography.Paragraph className="text-justify">
                    Allergies develop when the immune system reacts to a meal
                    that usually doesn't trigger a reaction in most individuals,
                    a foreign substance like pollen, bee venom, or pet dander.
                    <Typography.Link
                        href="https://www.mayoclinic.org/diseases-conditions/allergies/symptoms-causes/syc-20351497"
                        target="_blank"
                        type="secondary"
                    >
                        &nbsp;[Allergies]
                    </Typography.Link>
                </Typography.Paragraph>

                <Typography.Title level={4}>Allergic Reaction</Typography.Title>
                <Typography.Paragraph className="text-justify">
                    The way the body reacts to an allergen is called a "allergic
                    response." An allergic reaction is the outcome of a series
                    of events. If you have allergies, your body will produce
                    allergic antibodies the first time you are exposed to a
                    particular allergen. These antibodies have the task of
                    locating the allergens and assisting in their expulsion from
                    the body. As a result, histamine, a substance that
                    contributes to allergy symptoms, is released.
                    <Typography.Link
                        href="https://my.clevelandclinic.org/health/diseases/8610-allergy-overview"
                        target="_blank"
                        type="secondary"
                    >
                        &nbsp;[Allergic Reaction]
                    </Typography.Link>
                </Typography.Paragraph>
            </Col>
        </div>
    );
};

export default Home;
