OpenDisclosure.CandidateView = Backbone.View.extend({

  template: _.template("\
    <h1><%= attributes.short_name %></h1>\
    <section class='clearfix' id='mathbar'>\
      <div class='col-sm-3 money-label'>Total Contributions <br><span class='money-number'><%= friendlySummaryNumber('total_contributions_received') %></span><span class='mathsign'>–</span></div>\
      <div class='col-sm-3 money-label'>Expenditures <br><span class='money-number'><%= friendlySummaryNumber('total_expenditures_made') %></span><span class='mathsign'>=</span></div>\
      <div class='col-sm-3 money-label'>Cash On Hand <br><span class='money-number'><%= friendlySummaryNumber('ending_cash_balance') %></span></div>\
      <div class='col-sm-3 money-label count'> No. of Contributions <br><span class='money-number'><%= attributes.received_contributions_count %></span></div>\
    </section>\
    <section class='clearfix' id= 'candidateDetails'>\
        <div class='col-sm-3'>\
          <img class='mayor-picture' src='<%= attributes.imagePath %>' />\
          <p><%= attributes.profession %></p>\
          <p>Party Affiliation: <%= attributes.party_affiliation %></p>\
          <p><a id='twitter' href='https://twitter.com/'+ <%= attributes.twitter %>><%= attributes.twitter %></a></p>\
        </div>\
        <div class='col-sm-5'>\
          <p><%= attributes.bio %></p>\
          <div class='sources'>\
          <span>Sources</span><br>\
            <% (attributes.sources || []).forEach(function (source) { %>\
              <a href='<%= source.uri %>'><%= source.name %></a><br>\
            <% }) %>\
          </div>\
        </div>\
        <div class='col-sm-4'>\
          <% if (typeof attributes.summary !== 'undefined') { %>\
          <p>Total Raised:  <%= friendlySummaryNumber('total_contributions_received') %></p>\
          <p>Total Expenditures: <%= friendlySummaryNumber('total_expenditures_made') %></p>\
          <p>Ending Cash On Hand: <%= friendlySummaryNumber('ending_cash_balance') %></p>\
          <p>Last Updated: <%= attributes.summary.last_summary_date %> </p>\
          <% } %>\
    </section>\
    <section class='clearfix' id= 'category'></section>\
    <section class='clearfix' id= 'topContributors'></section>\
    <section class='clearfix' id= 'contributors'></section>\
  "),

  initialize: function(){
    if (this.model) {
      this.model.attributes.imagePath = this.model.imagePath();
      this.render();}
    else {
      app.navigate('',true);
    }
  },

  render: function(){
    this.updateNav();

    //Render main view
    this.$el.html(this.template(this.model));

    //Render Subviews
    this.renderCategoryChart();
    this.renderTopContributors();
    this.renderAllContributions();

    //Listen for new data
    this.listenTo(app.categoryContributions, 'sync', this.renderCategoryChart);
    this.listenTo(app.employerContributions, 'sync', this.renderTopContributors);
    this.listenTo(app.contributions, 'sync', this.renderAllContributions);
  },

  renderCategoryChart: function() {
    var candidateId = this.model.attributes.id;
    this.categories = _.filter(app.categoryContributions.models, function(c) {
      return c.attributes.recipient_id == candidateId;
    });

    new OpenDisclosure.CategoryView({
      el: '#category',
      collection: this.categories,
      summary: this.model.attributes.summary
    });
  },

  renderTopContributors: function(){
    // Filter contributors based on cadidateId
    var count = 0;
    var candidateId = this.model.attributes.id;
    this.topContributions = _.filter(app.employerContributions.models, function(c) {
      return (c.attributes.recipient_id == candidateId) && (++count <= 10);
    });

    // Create a new subview
    new OpenDisclosure.TopContributorsView({
      el: "#topContributors",
      collection: this.topContributions
    });
  },

  renderAllContributions: function(){
    var candidateId = this.model.attributes.id;
    this.filteredContributions = _.filter(app.contributions.models, function(c) {
      return c.attributes.recipient.id == candidateId;
    });

    new OpenDisclosure.ContributorsView({el: "#contributors",
      collection: this.filteredContributions,
      headline: 'All Contributions'
    });
  },

  updateNav: function(){
    $('.sidebar li').removeClass('active');
    $('#nav-'+this.model.attributes.id).addClass('active');
  }

});
