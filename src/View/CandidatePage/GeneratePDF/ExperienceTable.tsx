import { ExperienceType } from "~/hooks/useCandidate";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  rowCompany: {
    width: "30%",
  },
  rowJob: {
    width: "30%",
  },
  rowStart: {
    width: "20%",
  },
  rowEnd: {
    width: "20%",
  },
});
type Props = {
  experience: ExperienceType[];
};

export const ExperienceTable = ({ experience }: Props) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.rowCompany}>Company</Text>
        <Text style={styles.rowJob}>Job positioin</Text>
        <Text style={styles.rowStart}>Start date</Text>
        <Text style={styles.rowEnd}>End date</Text>
      </View>
      {experience.map((row, i) => {
        return (
          <View key={i} style={styles.row} wrap={false}>
            <Text style={styles.rowCompany}>{row.companyName}</Text>
            <Text style={styles.rowJob}>{row.job}</Text>
            <Text style={styles.rowStart}>{row.dateFrom.split("T")[0]}</Text>
            <Text style={styles.rowEnd}>
              {row.dateTo.length === 0 ? "PRESENT" : row.dateTo.split("T")[0]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
