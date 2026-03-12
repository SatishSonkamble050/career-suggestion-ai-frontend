import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font 
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf"
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Roboto",
    lineHeight: 1.6
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },

  card: {
    border: "1px solid #E5E7EB",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },

  careerTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },

  percentage: {
    color: "#2563EB",
    fontWeight: "bold"
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6
  },

  smallText: {
    fontSize: 10,
    color: "#555"
  },

  badge: {
    backgroundColor: "#2563EB",
    color: "#fff",
    padding: 3,
    fontSize: 9,
    borderRadius: 3
  }
});

export default function CareerReportPDF({ report }: any) {
  return (
    <Document>

      <Page size="A4" style={styles.page}>

        <Text style={styles.title}>Career Assessment Report</Text>
        <Text style={styles.smallText}>
          Generated on {new Date().toLocaleDateString()}
        </Text>

        {/* Top Careers */}
        <Text style={styles.sectionTitle}>Top Career Recommendations</Text>

        {report.topCareers.map((career: any, idx: number) => (
          <View key={idx} style={styles.card}>

            <View style={styles.row}>
              <Text style={styles.careerTitle}>
                {idx + 1}. {career.name}
              </Text>

              <Text style={styles.percentage}>
                {career.matchPercentage}%
              </Text>
            </View>

            {/* Why Match */}
            <Text style={styles.smallText}>Why this matches you:</Text>

            {career.whyMatches.map((reason: string, i: number) => (
              <Text key={i}>• {reason}</Text>
            ))}

            {/* Stats */}
            <View style={styles.statRow}>
              <Text>Employment: {career.employmentRate}%</Text>
              <Text>Growth: {career.growthRate}%</Text>
              <Text>
                Salary: Rs. {career.avgSalary.max} / Month
              </Text>
            </View>

          </View>
        ))}

        {/* Colleges */}
        <Text style={styles.sectionTitle}>Suggested Colleges</Text>

        {report.collegeSuggestions.map((college: any, idx: number) => (
          <View key={idx} style={styles.card}>

            <View style={styles.row}>
              <Text>{college.name}</Text>
              <Text style={styles.percentage}>{college.type}</Text>
            </View>

            <Text style={styles.smallText}>
              Location: {college.state}
            </Text>

            <Text>
              Placement Rate: {college.placementRate} %
            </Text>

            <Text>
              Avg Package: Rs. {college.avgPackage} LPA
            </Text>

          </View>
        ))}

        {/* Career Roadmap */}
        <Text style={styles.sectionTitle}>Career Roadmap</Text>

        {report.roadmap.map((step: any, idx: number) => (
          <View key={idx} style={styles.card}>

            <Text style={styles.careerTitle}>
              Step {step.step}: {step.title}
            </Text>

            <Text style={styles.smallText}>
              Timeline: {step.timeline}
            </Text>

            <Text>{step.description}</Text>

            {step.actions.map((action: string, i: number) => (
              <Text key={i}>{`> `} {action}</Text>
            ))}

          </View>
        ))}

      </Page>

    </Document>
  );
}