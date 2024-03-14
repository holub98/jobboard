import { CandidateFullInfoType } from "~/hooks/useCandidate";
import { BaseDocumentPdf } from "./BaseDocumentPdf";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { LanguageTable } from "./LanguageTable";
import { EducationTable } from "./EducationTable";
import { ExperienceTable } from "./ExperienceTable";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});
type Props = {
  data: CandidateFullInfoType;
};
export const CandidateResumePdf = ({
  data: { candidate, offer, company },
}: Props) => {
  return (
    <BaseDocumentPdf offerData={offer} companyData={company}>
      <View
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>Details:</Text>
        <Text>
          Full name:{" "}
          <Text style={styles.bold}>
            {candidate.firstName} {candidate.firstName}
          </Text>
        </Text>
        <Text>
          Email: <Text style={styles.bold}>{candidate.email}</Text>
        </Text>
        <Text>
          Phone: <Text style={styles.bold}>{candidate.phone}</Text>
        </Text>
      </View>
      {candidate.languages.length !== 0 && (
        <View
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 21 }}>Languages</Text>
          <LanguageTable languages={candidate.languages} />
        </View>
      )}
      <View
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>Education</Text>
        <EducationTable education={candidate.education} />
      </View>

      {candidate.experience === undefined && (
        <View
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 21 }}>
            Candidate do not have experience yet.
          </Text>
        </View>
      )}
      {candidate.experience && (
        <View
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 21 }}>Experience</Text>
          <ExperienceTable experience={candidate.experience} />
        </View>
      )}
      <View
        style={{
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 21 }}>Tech stack</Text>
        <View
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {candidate.stack.map((it, i) => {
            return (
              <Text key={i}>
                {it} {i < candidate.stack.length - 1 && <Text>•</Text>}
              </Text>
            );
          })}
        </View>
      </View>
    </BaseDocumentPdf>
  );
};
