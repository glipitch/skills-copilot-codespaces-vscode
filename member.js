function skillsMember() {
  return {
    name: 'skillsMember',
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        skills: this.member.skills
      };
    },
    template: `
      <ul>
        <li v-for="skill in skills">{{ skill }}</li>
      </ul>
    `
  };
}